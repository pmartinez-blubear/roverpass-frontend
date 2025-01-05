import { Campgrounds } from "../../../interfaces/campgrounds/campgroundsInterface";
import { ReducerInterface } from "../../../interfaces/reducerInterface";

export const favoritesReducer = ( initialState:Campgrounds[] = [], action:ReducerInterface ) => {

    switch ( action.type ) {
        case 'addFavorite':
            return [ ...initialState, action.payload ];

        case 'removeFavorite':
            return initialState.filter( (todo:Campgrounds) => todo.id !== action.payload );

        case 'updateFavorite':
            return [...action.payload];
    
        default:
            return initialState;
    }


}