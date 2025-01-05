import {  useState } from "react";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { FavoriteCampground } from "../../interfaces/campgrounds/campgroundsInterface";
import { handleError } from "../../utils/errorMessages";
import { useFavorites } from "../../contexts/favorites/favoritesContext";

const axiosPetition = axiosRequestInterceptor();

const useFavoritePage = () => {
    const useFavorite = useFavorites()
    

    const [ errorFavoritePage, setErrorFavoritePage ] = useState('');

    const getFavoritesCampgrounds = async () => {
        const data = await axiosPetition.get<FavoriteCampground[]>('/favorites.json').catch((error) => {
            setErrorFavoritePage(handleError(error));
          });

         if(data){
            const campgrounds = data.data.map((campground) => campground.campground)
            useFavorite?.updateFavoriteCampground(campgrounds)
         } 
    }

    return {
        errorFavoritePage,
        getFavoritesCampgrounds
    }
}

export default useFavoritePage;