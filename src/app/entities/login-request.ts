export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins: number;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
