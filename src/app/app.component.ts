import { Component, signal } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MissaoService } from '@services/missao.service';
import { FormsModule } from '@angular/forms';
import { LoginResponse } from '@entities/login-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule],
})
export class AppComponent {
  title = 'refresh-tokens-angular';

  protected userName = signal<string>('');
  protected isAuthenticated = signal<boolean>(false);

  constructor(
    private missaoService: MissaoService,
    private authService: AuthService
  ) {}

  protected login() {
    this.missaoService
      .login({ username: this.userName(), password: 'emilyspass' })
      .subscribe((response: LoginResponse) => {
        this.isAuthenticated.set(true);
        this.authService.setAuthTokens(response.token, response.refreshToken);
      });
  }

  protected checkHeroi() {
    console.log('check');
  }
}
