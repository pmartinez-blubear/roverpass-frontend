import { useEffect, useReducer } from "react";
import { favoritesReducer } from "./reducer/favoritesReducer";
import { Campground } from "../../interfaces/campgrounds/campgroundsInterface";


const init = () => {
    const getSaved = localStorage.getItem('saved')
    return getSaved ? JSON.parse(getSaved) : [];
}

const useProviderFavorites = () => {
    const [ favoritesCampgrounds, dispatch ] = useReducer( favoritesReducer, [], init );

    useEffect(() => {
        localStorage.setItem('saved', JSON.stringify( favoritesCampgrounds ));
    }, [favoritesCampgrounds])

    const addFavoriteCampground = (campground:Campground) => {
        dispatch({ type: 'addFavorite', payload: campground })
    }

    const deleteFavoriteCampground = (campground:Campground) => {
        dispatch({ type: 'removeFavorite', payload: campground.id })
    }

    const updateFavoriteCampground = (campgrounds:Campground[]) => {
        dispatch({ type: 'updateFavorite', payload: campgrounds })
    }

    return {
        favoritesCampgrounds,
        addFavoriteCampground,
        deleteFavoriteCampground,
        updateFavoriteCampground
    }
}

export default useProviderFavorites;