import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '@entities/login-request';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { loginResponseMapper } from '../mappers/login-mapper';

@Injectable({
  providedIn: 'root',
})
export class MissaoService {
  private apiUrl = `${environment.API_URL}/auth`;

  constructor(private httpClient: HttpClient) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(take(1), map(loginResponseMapper));
  }
}
