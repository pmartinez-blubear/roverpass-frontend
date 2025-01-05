
import { useState } from "react";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { handleError } from "../../utils/errorMessages";
import { FavoriteCampground } from "../../interfaces/campgrounds/campgroundsInterface";
import { useFavorites } from "../../contexts/favorites/favoritesContext";


const axiosPetition = axiosRequestInterceptor();

const useDeleteFavoriteCampgrounds = () => {
   
    const useFavorite = useFavorites()
    
    const [ isLoadingDeleteFavorite, setIsLoadingDeleteFavorite ] = useState(false);
    const [ errorDeleteFavorite, setErrorDeleteFavorite ] = useState('');
    
    const removeFavoriteCampground = async (campground:FavoriteCampground) => {
        setIsLoadingDeleteFavorite(true);
        const data = await axiosPetition.delete(`favorites/${campground.id}.json`).catch((error) => {
            setErrorDeleteFavorite(handleError(error));
        }).finally(() => {
            setIsLoadingDeleteFavorite(false);
        });

         if(data){
            useFavorite?.deleteFavoriteCampground(campground)
         } 
        
    }

    return {
        isLoadingDeleteFavorite,
        errorDeleteFavorite,
        removeFavoriteCampground
    }
}

export default useDeleteFavoriteCampgrounds;