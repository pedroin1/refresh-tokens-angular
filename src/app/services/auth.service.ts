import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { REFRESH_STORAGE_TOKEN, STORAGE_TOKEN } from '@constants/storage-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  public setAuthTokens(token: string, refreshToken: string): void {
    this.storageService.setItemOnStorage(STORAGE_TOKEN, token);
    this.storageService.setItemOnStorage(REFRESH_STORAGE_TOKEN, refreshToken);
  }

  public getToken(): string {
    return this.storageService.getItemFromStorage<string>(STORAGE_TOKEN)!;
  }
  public getRefreshToken(): string {
    return this.storageService.getItemFromStorage<string>(STORAGE_TOKEN)!;
  }
}
