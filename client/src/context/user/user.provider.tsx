import { useState, useCallback, useEffect } from "react";

import { useAxios } from "utils/hooks/useAxios";

import { UserContext } from "./user.context";

const storageName = "userData";

export const UserProvider = ({ children }: any) => {
  const [token, setToken] = useState<null | string>(null);
  const [user, setUser] = useState<null | string>(null);
  const [isAuthentificated, setAuth] = useState<boolean>(!!token);

  const { request } = useAxios();

  const login = useCallback((jwtToken: string, user: string) => {
    setToken(jwtToken);
    setUser(user);
    setAuth(true);
    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, username: user })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuth(false);
    localStorage.removeItem(storageName);
  }, []);

  const handleAuthentification = useCallback(async () => {
    const data = JSON.parse(localStorage.getItem(storageName)!);
    if (data?.token) {
      const res: any = await request("/api/auth", "GET");

      if (res) {
        return login(data.token, data.username);
      }
    }

    logout();
  }, [login, logout, request]);

  useEffect(() => {
    handleAuthentification();
  }, [handleAuthentification]);

  return (
    <UserContext.Provider
      value={{ token, user, isAuthentificated, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
