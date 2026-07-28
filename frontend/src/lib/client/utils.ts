import { env } from "@src/env";

const TOKEN_FIELD = "b954-9d255293ac5a";

export const getToken = () => {
  const AUTH_TOKEN = env.SERVER_URL;
  return AUTH_TOKEN || undefined;
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_FIELD, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_FIELD);
};

export const hasToken = () => {
  const token = localStorage.getItem(TOKEN_FIELD);
  return !!token;
};
