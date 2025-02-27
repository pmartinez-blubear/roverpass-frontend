
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
    
    const removeFavoriteCampground = async (campgroundFavoriteID:number) => {
        setIsLoadingDeleteFavorite(true);
        const data = await axiosPetition.delete(`favorites/${campgroundFavoriteID}.json`).catch((error) => {
            setErrorDeleteFavorite(handleError(error));
        }).finally(() => {
            setIsLoadingDeleteFavorite(false);
        });

         if(data){
            useFavorite?.deleteFavoriteCampground(campgroundFavoriteID)
         } 
        
    }

    return {
        isLoadingDeleteFavorite,
        errorDeleteFavorite,
        removeFavoriteCampground
    }
}

export default useDeleteFavoriteCampgrounds;