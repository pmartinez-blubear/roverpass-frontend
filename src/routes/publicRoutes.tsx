import {
  Navigate,
  Outlet
} from "react-router";
import { useAuth } from "../contexts/auth/authContext";

const PublicRoutes = () => {
  const auth = useAuth();
  return !auth?.user ? 
    <>
      <Outlet />
    </>
   : 
   <Navigate to="/" />;
};

export default PublicRoutes;