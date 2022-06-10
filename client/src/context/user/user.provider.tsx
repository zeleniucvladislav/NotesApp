import { useState, useCallback, useEffect } from "react";
import { UserContext } from "./user.context";
import { UserType } from "types/user.type";

const storageName = "userData";

export const UserProvider = ({ children }: any) => {
  const [token, setToken] = useState<null | string>(null);
  const [user, setUser] = useState<null | UserType>(null);
  const [isAuthentificated, setAuth] = useState<boolean>(!!token);

  const login = useCallback((jwtToken: string, id: string, user: string) => {
    setToken(jwtToken);
    setUser({ userId: id, username: user });
    setAuth(true);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken, username: user })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuth(false);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!);

    if (data?.token) {
      login(data.token, data.userId, data.username);
    }
  }, [login]);

  return (
    <UserContext.Provider
      value={{ token, user, isAuthentificated, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
