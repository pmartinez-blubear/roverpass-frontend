
import { useEffect, useState } from 'react';
import TempImage from '../../assets/temp_card.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Campgrounds, FavoriteCampground } from '../../interfaces/campgrounds/campgroundsInterface';
import { useAuth } from '../../contexts/auth/authContext';
import useSaveFavoriteCampgrounds from '../../hooks/campgrounds/useSaveFavoriteCampground';
import useDeleteFavoriteCampgrounds from '../../hooks/campgrounds/useDeleteFavoriteCampground';
import '../../styles/catalog/catalog.css'

interface CardCatalogProps {
    campground:Campgrounds,
    favoriteCampground: FavoriteCampground[] | undefined
}
function CardCatalog({campground, favoriteCampground}:CardCatalogProps) {
    
    const auth = useAuth()
    const { saveFavoriteCampground, isLoadingFavorite } = useSaveFavoriteCampgrounds()
    const { removeFavoriteCampground, isLoadingDeleteFavorite } = useDeleteFavoriteCampgrounds()
    

    const [saved, setSaved] = useState(campground.is_favorited ?? false);

    useEffect(() => {
        const isFavorite = favoriteCampground?.find((camp:FavoriteCampground) => camp.campground.id === campground.id)
        setSaved( isFavorite ? true : false)
    },[favoriteCampground])
    

    const handleSaveCamp = () => {
        if(!auth?.user){
            auth?.handleShowModalLogin(true)
            return;
        }
        // save camp
        if(!saved){
            saveFavoriteCampground(campground)
        }else{
            const findInFavorite = favoriteCampground?.find((camp:FavoriteCampground) => camp.campground.id === campground.id)
            if(findInFavorite) removeFavoriteCampground(findInFavorite)
        }
    }

    return (       
        <div className="cardCatalog">
            <img src={ campground.image } className="imageCatalog" alt="..." />
            <div className="cardInfo">
                <div className='containerTitleRanking'>
                    <div className='containerTitle'>
                        <h2 className="cardTitle ">{ campground.name }</h2>
                        <button className={`saveButton ${isLoadingDeleteFavorite || isLoadingFavorite ? 'disabled' : ''}`} onClick={handleSaveCamp}>
                            { saved ? 
                                <FontAwesomeIcon icon={['fas', 'heart']} className='likeIcon' /> :
                                <FontAwesomeIcon icon={['far', 'heart']} className='likeIcon' />
                            } 
                        </button>
                    </div>
                    <div className='containerRanking'>
                        <FontAwesomeIcon icon={['fas', 'star']} className='starIcon' />
                        <FontAwesomeIcon icon={['fas', 'star']} className='starIcon' />
                        <FontAwesomeIcon icon={['fas', 'star']} className='starIcon' />
                        <FontAwesomeIcon icon={['fas', 'star']} className='starIcon' />
                        <FontAwesomeIcon icon={['far', 'star']} className='starIcon' />
                    </div>
                </div>
                <div className='containerLocation'>
                    <FontAwesomeIcon icon={['fas', 'location-dot']} className='locationIcon' />
                    { campground.location }
                </div>
                <p className="cardDescription">
                   { campground.description}
                </p>
                { campground.price && <p className='containerPrice'>
                    From ${campground.price} USD <span>per night</span>        
                </p> }
                <div className='campInfo'>
                    <div className='info'>
                        <FontAwesomeIcon icon={['fas', 'image']} className='infoIcon' />
                        <p>14 photos</p>
                    </div>
                    <div className='info'>
                        <FontAwesomeIcon icon={['fas', 'message']} className='infoIcon' />
                        <p>14 reviews</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCatalog;