import { AuthReponse } from '@entities/login-request';

export const authResponseMapper = (response: any): AuthReponse => {
  return {
    id: response.id,
    firstName: response.firstName,
  };
};
