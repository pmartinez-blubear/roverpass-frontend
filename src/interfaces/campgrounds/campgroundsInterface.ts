export interface Campgrounds {
    id:          number;
    name:        string;
    location:    string;
    description: string;
    price:       number;
    created_at:  Date;
    updated_at:  Date;
    url:         string;
}


export interface FavoriteCampground {
    id:            number;
    user_id:       number;
    campground_id: number;
    campground:    Campground;
    created_at:    Date;
    updated_at:    Date;
    url:           string;
}

export interface Campground {
    id:          number;
    name:        string;
    location:    string;
    description: string;
    price:       number;
    created_at:  Date;
    updated_at:  Date;
}
