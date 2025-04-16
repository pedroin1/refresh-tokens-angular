import { LoginResponse } from '@entities/login-request';

export const loginResponseMapper = (response: any): LoginResponse => {
  return {
    token: response.accessToken,
    refreshToken: response.refreshToken,
  };
};
