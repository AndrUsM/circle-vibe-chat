export const localStorageService = {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },
};
