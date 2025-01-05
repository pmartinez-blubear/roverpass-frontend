import { createContext, useContext } from "react";
import { AuthContextType } from "../../interfaces/login/LoginInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  return useContext(AuthContext);
}

export {AuthContext, useAuth};