import { createContext, useContext } from "react";
import { Campground } from "../../interfaces/campgrounds/campgroundsInterface";

interface FavoritesContextType {
    favoritesCampgrounds: Campground[];
    addFavoriteCampground: (campground:Campground) => void;
    deleteFavoriteCampground: (campground:Campground) => void;
    updateFavoriteCampground: (campgrounds:Campground[]) => void;
}


const FavoritesContext = createContext<FavoritesContextType | undefined >( undefined);

const useFavorites = () => {
  return useContext(FavoritesContext);
}

export {FavoritesContext, useFavorites};