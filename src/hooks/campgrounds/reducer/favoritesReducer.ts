import { FavoriteCampground } from "../../../interfaces/campgrounds/campgroundsInterface";
import { ReducerInterface } from "../../../interfaces/reducerInterface";

export const favoritesReducer = ( initialState:FavoriteCampground [] = [], action:ReducerInterface ) => {

    switch ( action.type ) {
        case 'addFavorite':
            return [ ...initialState, action.payload ];

        case 'removeFavorite':
            return initialState.filter( (todo:FavoriteCampground) => todo.id !== action.payload );

        case 'updateFavorite':
            return [...action.payload];
    
        default:
            return initialState;
    }


}