import { Component, signal } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MissaoService } from '@services/missao.service';
import { FormsModule } from '@angular/forms';
import { LoginResponse } from '@entities/login-request';
import { catchError, tap, throwError } from 'rxjs';
import { StorageService } from '@services/storage.service';
import { REFRESH_STORAGE_TOKEN, STORAGE_TOKEN } from '@constants/storage-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule],
})
export class AppComponent {
  protected title = 'refresh-tokens-angular';
  protected userName = signal<string>('');
  protected isAuthenticated = signal<boolean>(false);

  constructor(
    private missaoService: MissaoService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  protected login() {
    this.missaoService
      .login({
        username: this.userName(),
        password: 'emilyspass',
        expiresInMins: 1,
      })
      .subscribe((response: LoginResponse) => {
        this.isAuthenticated.set(true);
        this.authService.setAuthTokens(response.token, response.refreshToken);
      });
  }

  protected checkAutentication() {
    this.missaoService
      .checkAutentication({
        token: this.authService.getToken(),
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.missaoService
              .refreshToken({
                refreshToken: this.storageService.getItemFromStorage<string>(
                  REFRESH_STORAGE_TOKEN
                )!,
                expiresInMins: 1,
              })
              .pipe(
                tap((response) => {
                  this.storageService.setItemOnStorage(
                    STORAGE_TOKEN,
                    response.token
                  );
                  this.storageService.setItemOnStorage(
                    REFRESH_STORAGE_TOKEN,
                    response.refreshToken
                  );
                })
              );
          } else {
            this.isAuthenticated.set(false);
            return throwError(() => error);
          }
        })
      )
      .subscribe(() => this.isAuthenticated.set(true));
  }
}
