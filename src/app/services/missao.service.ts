import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '@entities/login-request';
import { map, Observable, take } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthReponse, AuthRequest } from '@entities/auth-request';
import { RefreshTokenRequest } from '@entities/refresh-request';
import { loginResponseMapper } from '@mappers/login-mapper';
import { authResponseMapper } from '@mappers/auth-mapper';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MissaoService {
  private apiUrl = `${environment.API_URL}/auth`;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(take(1), map(loginResponseMapper));
  }

  public checkAutentication(
    authenticationRequest: AuthRequest
  ): Observable<AuthReponse> {
    const headersConfig = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authenticationRequest.token}`
    );

    return this.httpClient
      .get<AuthReponse>(`${this.apiUrl}/me`, { headers: headersConfig })
      .pipe(take(1), map(authResponseMapper));
  }

  public refreshToken(
    refreshTokenRequest: RefreshTokenRequest
  ): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/refresh`, refreshTokenRequest)
      .pipe(take(1), map(loginResponseMapper));
  }
}
