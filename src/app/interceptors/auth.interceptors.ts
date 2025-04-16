import { inject } from '@angular/core';
import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { MissaoService } from '@services/missao.service';
import { LoginResponse } from '@entities/login-request';
import { AuthService } from '@services/auth.service';

export const authInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const missaoService = inject(MissaoService);
  const authService = inject(AuthService);
  const cloneReq = getRequestWithUpdatedToken(req, authService);

  //retornando a requisiçao clonada, e gerenciando o token e o refresh token
  return next(cloneReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return missaoService
          .refreshToken({
            refreshToken: authService.getRefreshToken()!,
            expiresInMins: 1,
          })
          .pipe(
            tap((response: LoginResponse) =>
              authService.setAuthTokens(response.token, response.refreshToken)
            ),

            //refazendo a req com headers atualizados
            switchMap(() => next(getRequestWithUpdatedToken(req, authService)))
          );
      } else {
        return throwError(() => error);
      }
    })
  );
};

const getRequestWithUpdatedToken = (
  req: HttpRequest<any>,
  authService: AuthService
) => {
  //verificando se existe token
  const token = authService.getToken();
  if (!token) return req; //se n tiver token passa a req pra frente

  //configurando headers
  const headersConfig = new HttpHeaders().set(
    'Authorization',
    `Bearer ${token}`
  );

  //retornando a req clonada com os headers
  return req.clone({ headers: headersConfig });
};
