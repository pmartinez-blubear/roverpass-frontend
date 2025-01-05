import { createContext, useContext } from "react";


export interface AuthContextType {
    user: User | null;
    login: (email:string, password:string) => void;
    logout: () => void;
    handleShowModalLogin: (value:boolean) => void;
    showModalLogin:boolean
    handleShowModalLogout: (value:boolean) => void;
    showModalLogout:boolean,
    errorAuth:string,
    isLoadingAuth:boolean
}

interface User {
  email:string;
  token:string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  return useContext(AuthContext);
}

export {AuthContext, useAuth};