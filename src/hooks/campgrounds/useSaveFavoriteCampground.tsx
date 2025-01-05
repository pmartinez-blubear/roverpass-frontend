
import { useState } from "react";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { handleError } from "../../utils/errorMessages";
import { Campground } from "../../interfaces/campgrounds/campgroundsInterface";
import { useProviderFavorites } from "../../contexts/favorites/favoritesProvider";
import { useFavorites } from "../../contexts/favorites/favoritesContext";


const axiosPetition = axiosRequestInterceptor();

const useSaveFavoriteCampgrounds = () => {
   
    const useFavorite = useFavorites()
    const [ isLoadingFavorite, setIsLoadingFavorite ] = useState(false);
    const [ errorFavorite, setErrorFavorite ] = useState('');
    
    const saveFavoriteCampground = async (campground:Campground) => {
        setIsLoadingFavorite(true)
        const raw = JSON.stringify({
            "campground_id": campground.id
        });
        const data = await axiosPetition.post('/favorites.json', raw)
        .catch((error) => {
            setErrorFavorite(handleError(error));
        }).finally(() => {
            setIsLoadingFavorite(false);
        });

        if(data){
            useFavorite?.addFavoriteCampground(campground)
        } 
        
    }

    return {
        isLoadingFavorite,
        errorFavorite,
        saveFavoriteCampground
    }
}

export default useSaveFavoriteCampgrounds;