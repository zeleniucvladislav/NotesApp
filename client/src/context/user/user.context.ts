import { createContext, useContext } from "react";
import { UserType } from "types/user.type";

type UserContextType = {
  token: string | null;
  user: null | UserType;
  isAuthentificated: boolean;
  login: (jwtToken: string, id: string, user: string) => void;
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
