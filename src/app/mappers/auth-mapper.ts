import { AuthReponse } from '@entities/auth-request';

export const authResponseMapper = (response: any): AuthReponse => {
  return {
    id: response.id,
    firstName: response.firstName,
  };
};
