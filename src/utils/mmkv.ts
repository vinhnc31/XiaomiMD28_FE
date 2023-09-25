import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

/**
 * Key of Mmkv storage
 */
export enum StorageKey {
  UserLanguage = 'user-language',
  User = 'User',
  AccessToken = 'AccessToken',
  RefressToken = 'RefressToken',
}

export class StorageUtils {
  /**
   * Lưu lại giá trị vào Mmkv storage
   * @param key
   * @param value
   */
  static save(key: StorageKey, value: string): void {
    storage.set(key, value);
  }

  /**
   * Lấy giá trị từ trong Mmkv storage
   * @param key
   */
  static get(key: StorageKey): string | undefined {
    return storage.getString(key);
  }

  /**
   * Xóa giá trị đã lưu trong Mmkv storage
   * @param key
   */
  static remove(key: StorageKey): void {
    return storage.delete(key);
  }

  /**
   * Get đối tượng/mảng đã lưu từ Mmkv storage
   * @param key
   */
  static getObject<T>(key: StorageKey): T | null {
    const value = storage.getString(key);
    if (!value) return null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(value);
  }

  /**
   * Lưu lại đối tượng hoặc 1 mảng vào Mmkv storage
   * @param key
   * @param value
   */
  static saveObject<T>(key: StorageKey, value: T): void {
    storage.set(key, JSON.stringify(value));
  }

  static clear(): void {
    storage.clearAll();
  }

  static clearAccount(): void {
    storage.delete(StorageKey.AccessToken);
    storage.delete(StorageKey.User);
    storage.delete(StorageKey.RefressToken);
  }
}
