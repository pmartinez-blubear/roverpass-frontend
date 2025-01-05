import { useState } from "react";
import { getLocalStorage } from "../../providers/localStorage/localStorageProvider";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { handleError } from "../../utils/errorMessages";
import { useLocation, useNavigate } from "react-router";
import { LoginForm } from "../../interfaces/login/LoginInterface";

const axiosPetition = axiosRequestInterceptor();

interface LoginResponse {
  token: string;
}

const useProvideAuth = () => {
    const [user, setUser] = useState(getLocalStorage('user') || null);
    const [ showModalLogout, setShowModalLogout ] = useState(false);
    const [ showModalLogin, setShowModalLogin ] = useState(false);
    const [ isLoadingAuth, setIsLoadingAuth ] = useState(false);
    const [ errorAuth, setErrorAuth ] = useState('');
    const location = useLocation()
    const navigate = useNavigate();
  
    const login = async (formLogin:LoginForm) => {
      setIsLoadingAuth(true);
      setErrorAuth('')
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      try{
        const data = await axiosPetition.post<LoginResponse>('/session', formLogin).catch((error) => {
            setErrorAuth(handleError(error));
        });
        if(data){
          const user = {
            email:formLogin.email_address
          }
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', data.data.token);
          setShowModalLogin(false)
          if(location.pathname === "/signin") navigate('/')
        }
      }catch(e){

      }finally{
        setIsLoadingAuth(false);
      }
    };

    const handleShowModalLogin = (active:boolean) => {
      setShowModalLogin(active)
    }

    const handleShowModalLogout = (active:boolean) => {
      setShowModalLogout(active)
    }

    const logout = async () => {
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     setUser(null);
     setShowModalLogout(false);
    };
  
    return {
      user,
      login,
      logout,
      handleShowModalLogout,
      showModalLogout,
      handleShowModalLogin,
      showModalLogin,
      isLoadingAuth,
      errorAuth
    };
  };

  export default useProvideAuth;