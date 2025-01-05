export interface ReducerInterface {
    type: 'addFavorite' | 'removeFavorite' | 'updateFavorite';
    payload: any;
}