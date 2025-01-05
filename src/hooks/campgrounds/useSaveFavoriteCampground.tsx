
import { useState } from "react";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { handleError } from "../../utils/errorMessages";
import { Campgrounds, FavoriteCampground } from "../../interfaces/campgrounds/campgroundsInterface";
import { useFavorites } from "../../contexts/favorites/favoritesContext";

const axiosPetition = axiosRequestInterceptor();

const useSaveFavoriteCampgrounds = () => {
   
    const useFavorite = useFavorites()
    const [ isLoadingFavorite, setIsLoadingFavorite ] = useState(false);
    const [ errorFavorite, setErrorFavorite ] = useState('');
    
    const saveFavoriteCampground = async (campground:Campgrounds) => {
        setIsLoadingFavorite(true)
        const raw = JSON.stringify({
            "campground_id": campground.id
        });
        const data = await axiosPetition.post<FavoriteCampground>('/favorites.json', raw)
        .catch((error) => {
            setErrorFavorite(handleError(error));
        }).finally(() => {
            setIsLoadingFavorite(false);
        });

        if(data){
            useFavorite?.addFavoriteCampground(data.data)
        } 
        
    }

    return {
        isLoadingFavorite,
        errorFavorite,
        saveFavoriteCampground
    }
}

export default useSaveFavoriteCampgrounds;