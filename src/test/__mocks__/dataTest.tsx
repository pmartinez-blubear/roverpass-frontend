import { Campgrounds, FavoriteCampground } from "../../interfaces/campgrounds/campgroundsInterface";

export const mockCampgrounds:Campgrounds[] = [
    { 
        id: 1, 
        name: 'Campground Las Vegas',
        location: 'Las Vegas, Nevada',
        description: 'Description campground Las Vegas',
        image:'https://www.roverpass.com/system/pictures/images/000/055/523/big/IMG_7225.jpg?1527738685',
        is_favorited:true,
        favorited_id: 980190969,
        price:30
    },
    { 
        id: 2, 
        name: 'Campground California',
        location: 'San Francisco, California',
        description: 'Description campground California',
        image:'https://www.roverpass.com/system/pictures/images/000/061/269/full/sequoia-rv-park-dunlop-ca-8.jpg?1593181120',
        is_favorited:false,
        favorited_id: null,
        price:20
    },
];

export const mockFavoritesCampgroundsArray:FavoriteCampground[] = [
        {
            id: 980190967,
            user_id: 298486374,
            campground_id: 113629430,
            campground: mockCampgrounds[0],
            url: "http://localhost:3000/v1/favorites/980190969"
        }
]
