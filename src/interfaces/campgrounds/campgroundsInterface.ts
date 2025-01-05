export interface Campgrounds {
    id:          number;
    name:        string;
    image:       string;
    location:    string;
    description: string;
    price:       number;
    created_at?:  Date;
    updated_at?:  Date;
    url?:         string;
    is_favorited: boolean | null;
}


export interface FavoriteCampground {
    id:            number;
    user_id:       number;
    campground_id: number;
    campground:    Campgrounds;
    created_at:    Date;
    updated_at:    Date;
    url:           string;
}


export interface FavoritesContextType {
    favoritesCampgrounds: FavoriteCampground[];
    addFavoriteCampground: (campground:FavoriteCampground) => void;
    deleteFavoriteCampground: (campground:FavoriteCampground) => void;
    updateFavoriteCampground: (campgrounds:FavoriteCampground[]) => void;
}