
import { useEffect, useState } from 'react';
import TempImage from '../../assets/temp_card.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Campgrounds } from '../../interfaces/campgrounds/campgroundsInterface';
import { useAuth } from '../../contexts/auth/authContext';
import useSaveFavoriteCampgrounds from '../../hooks/campgrounds/useSaveFavoriteCampground';
import useDeleteFavoriteCampgrounds from '../../hooks/campgrounds/useDeleteFavoriteCampground';
import '../../styles/catalog/catalog.css'

interface CardCatalogProps {
    isSaved: boolean;
    campground:Campgrounds
}
function CardCatalog({isSaved, campground}:CardCatalogProps) {
    
    const auth = useAuth()
    const { saveFavoriteCampground, isLoadingFavorite } = useSaveFavoriteCampgrounds()
    const { removeFavoriteCampground, isLoadingDeleteFavorite } = useDeleteFavoriteCampgrounds()
    

    const [saved, setSaved] = useState(isSaved);

    useEffect(() => {
        setSaved(isSaved)
    },[isSaved])
    

    const handleSaveCamp = () => {
        if(!auth?.user){
            auth?.handleShowModalLogin(true)
            return;
        }
        // save camp
        if(!saved){
            saveFavoriteCampground(campground)
        }else{
            removeFavoriteCampground(campground)
        }
    }

    return (       
        <div className="cardCatalog">
            <img src={TempImage} className="imageCatalog" alt="..." />
            <div className="cardInfo">
                <div className='containerTitleRanking'>
                    <div className='containerTitle'>
                        <h2 className="card-title ">{ campground.name }</h2>
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