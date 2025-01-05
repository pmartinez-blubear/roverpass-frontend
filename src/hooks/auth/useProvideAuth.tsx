import { useState } from "react";
import { getLocalStorage } from "../../providers/localStorage/localStorageProvider";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { handleError } from "../../utils/errorMessages";
import { useLocation, useNavigate } from "react-router";
import { LoginForm } from "../../interfaces/login/LoginInterface";
interface LoginResponse {
  token: string;
}

const axiosPetition = axiosRequestInterceptor();
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
      const data = await axiosPetition.post<LoginResponse>('/session', formLogin)
      .catch((error) => {
          setErrorAuth(handleError(error));
      }).finally(()=>{
        setIsLoadingAuth(false);
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
    };

    const handleShowModalLogin = (active:boolean) => {
      setShowModalLogin(active)
    }

    const handleShowModalLogout = (active:boolean) => {
      setShowModalLogout(active)
    }

    const logout = async () => {
      setIsLoadingAuth(true);

      const data = await axiosPetition.delete('/session')
      .catch((error) => {
          setErrorAuth(handleError(error));
      }).finally(()=>{
        setIsLoadingAuth(false);
      });
      if(data){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setShowModalLogout(false);
      }     
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