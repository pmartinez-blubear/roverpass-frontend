import { Route, Routes } from "react-router"
import { ProviderAuth } from "./contexts/auth/authProvider"
import Catalog from "./pages/catalog/catalog"
import Login from "./pages/login/login"
import ProfileFavorites from "./pages/profile/favorites/favorites"
import ProtectedRoutes from "./routes/privateRoutes"
import PublicRoutes from "./routes/publicRoutes"
import { ProviderFavorites } from "./contexts/favorites/favoritesProvider"
import PublicLayoutRoutes from "./routes/publicLayoutRoutes"

function App() {

  return (
    <ProviderAuth>
      <ProviderFavorites>
        <Routes>
          <Route element={<PublicLayoutRoutes />}> 
            <Route index path="/" element={<Catalog />} /> 
          </Route>      
          <Route index path="/" element={<Catalog />} />
          <Route element={<ProtectedRoutes />}>        
            <Route path="/profile" element={<ProfileFavorites />} />
          </Route>
          <Route element={<PublicRoutes />}> 
            <Route path="signin" element={<Login />} />
          </Route>
        </Routes>
      </ProviderFavorites>
    </ProviderAuth>
  )
}

export default App
