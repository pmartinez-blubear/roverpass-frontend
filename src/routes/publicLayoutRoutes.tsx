import {
    Outlet
  } from "react-router";
  import LayoutPage from "../layouts/layout";
  
  
  
  const PublicLayoutRoutes = () => {
    
    return (
      <LayoutPage>
        <Outlet />
      </LayoutPage>
    )
  };
  
  export default PublicLayoutRoutes;