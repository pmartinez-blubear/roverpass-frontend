import { Campground } from "../../../interfaces/campgrounds/campgroundsInterface";
import { ReducerInterface } from "../../../interfaces/reducerInterface";

export const favoritesReducer = ( initialState:Campground[] = [], action:ReducerInterface ) => {

    console.log(initialState)

    switch ( action.type ) {
        case 'addFavorite':
            return [ ...initialState, action.payload ];

        case 'removeFavorite':
            return initialState.filter( (todo:Campground) => todo.id !== action.payload );

        case 'updateFavorite':
            return [...action.payload];
    
        default:
            return initialState;
    }


}