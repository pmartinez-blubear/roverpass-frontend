import  { useContext } from "react";
import {
  Navigate,
  Outlet
} from "react-router";
import { useAuth } from "../contexts/auth/authContext";
import LayoutPage from "../layouts/layout";



const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth?.user ? 
    <LayoutPage>
      <Outlet />
    </LayoutPage>
   : 
   <Navigate to="/signin" />;
};

export default ProtectedRoutes;