
  
  export interface AuthContextType {
      user: User | null;
      login: (data:LoginForm) => void;
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
  }
  
  export interface LoginForm{
    email_address:string,
    password:string
  }