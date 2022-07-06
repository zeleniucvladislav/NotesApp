import { createContext, useContext } from "react";

type UserContextType = {
  token: string | null;
  user: null | string;
  isAuthentificated: boolean;
  login: (jwtToken: string, user: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  token: null,
  user: null,
  isAuthentificated: false,
  login: () => {},
  logout: () => {},
});

export const useUserContext = () => useContext(UserContext);
