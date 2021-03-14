import {LocalStorageItem} from './LocalStorageItem';

export class LocalStorageDecorator {

  static getItem(localStorageItem: LocalStorageItem): string | null {
    return localStorage.getItem(localStorageItem);
  }

  static setItem(localStorageItem: LocalStorageItem, value: string): void {
    localStorage.setItem(localStorageItem, value);
  }

  static removeItem(localStorageItem: LocalStorageItem): void {
    localStorage.removeItem(localStorageItem);
  }

}
