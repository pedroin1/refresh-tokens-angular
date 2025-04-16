import { Component, signal } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MissaoService } from '@services/missao.service';
import { FormsModule } from '@angular/forms';
import { LoginResponse } from '@entities/login-request';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '@services/storage.service';

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
      .pipe(
        catchError((error) => {
          this.storageService.clearStorage();
          this.isAuthenticated.set(false);
          return throwError(() => error);
        })
      )
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
          this.isAuthenticated.set(false);
          return throwError(() => error);
        })
      )
      .subscribe(() => this.isAuthenticated.set(true));
  }
}
