import Cookies from 'js-cookie';

export const cookiesService = {
  set: (name: string, value: string, options = {}) => {
    Cookies.set(name, value, options);
  },

  get: (name: string) => {
    return Cookies.get(name);
  },

  remove: (name: string, options = {}) => {
    Cookies.remove(name, options);
  },

  clear: () => {
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
  },
};
