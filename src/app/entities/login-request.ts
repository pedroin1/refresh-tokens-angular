export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenLoginRequest {
  refreshToken: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
