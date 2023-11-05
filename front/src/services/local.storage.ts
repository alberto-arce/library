/* eslint-disable @typescript-eslint/no-explicit-any */
import lscache from "lscache";

const tokenkey = "tokenkey";
const duration = 86400000;

interface LocalStorage {
  set: (token: string) => void;
  get: () => any;
  delete: () => void;
}

const localStorage: LocalStorage = {
  set: (token) => lscache.set(tokenkey, token, duration),
  get: () => lscache.get(tokenkey),
  delete: () => lscache.flush(),
};
export { localStorage };
