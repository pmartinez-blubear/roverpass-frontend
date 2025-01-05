import { createContext, useContext } from "react";
import { FavoritesContextType } from "../../interfaces/campgrounds/campgroundsInterface";

const FavoritesContext = createContext<FavoritesContextType | undefined >( undefined);

const useFavorites = () => {
  return useContext(FavoritesContext);
}

export {FavoritesContext, useFavorites};