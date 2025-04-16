import { Injectable } from '@angular/core';
import { REFRESH_STORAGE_TOKEN, STORAGE_TOKEN } from '@constants/storage-token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItemOnStorage(key: string, value: any): void {
    const valueAsJson = JSON.stringify(value);

    if (!value) return;

    localStorage.setItem(key, valueAsJson);
  }

  public getItemFromStorage<T>(key: string): T | null {
    const valueFromStorage = localStorage.getItem(key);

    if (!valueFromStorage) {
      console.log('Item não encotrado no localstorage');
      return null;
    }

    return JSON.parse(valueFromStorage!) as T;
  }

  public clearStorage(): void {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(REFRESH_STORAGE_TOKEN);
  }
}
