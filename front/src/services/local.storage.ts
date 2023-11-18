/* eslint-disable @typescript-eslint/no-explicit-any */
import lscache from "lscache";
import { IResponse } from "../services/auth";

const tokenkey = "tokenkey";
const loggedInkey = "loggedInkey";
const duration = 86400000;

interface ILocalStorage {
  set: (user: IResponse) => void;
  get: () => IResponse;
  delete: () => void;
  setLoggedIn: (token: string) => void;
  getLoggedIn: () => any;
}

const localStorage: ILocalStorage = {
  set: (user) => lscache.set(tokenkey, user, duration),
  get: () => lscache.get(tokenkey),
  delete: () => lscache.flush(),
  setLoggedIn: (token) => lscache.set(loggedInkey, token, duration),
  getLoggedIn: () => lscache.get(loggedInkey),
};
export { localStorage };
