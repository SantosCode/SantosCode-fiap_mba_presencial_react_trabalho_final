import { createContext, useContext } from 'react';
import { User } from "../models/user";

export interface AuthContextType {
  user?: User;
  setUser: (user?: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  setUser: () => { }
});

export const useAuthProvider = (): AuthContextType =>
  useContext(AuthContext);