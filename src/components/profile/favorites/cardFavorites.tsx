import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TempImage from '../../../assets/temp_card.png'
import { FavoriteCampground } from '../../../interfaces/campgrounds/campgroundsInterface';
import '../../../styles/profile/profile.css'
import '../../../styles/catalog/catalog.css'
import PrimaryButton from '../../common/button/PrimaryButton';
import useDeleteFavoriteCampgrounds from '../../../hooks/campgrounds/useDeleteFavoriteCampground';

interface CardSavedProps {
  campground:FavoriteCampground,
  isLoadingDeleteFavorite:boolean,
  deleteCampground:(deleteCampground:FavoriteCampground) => void
}

function CardFavorites({ campground, isLoadingDeleteFavorite, deleteCampground }:CardSavedProps) {

  

  return (
    <div className='cardFavorites'>
      <img src={ campground.campground.image } className="imageCard" alt="..." />
        <div className='containerInfo'>
            <h2 className="card-title ">{ campground.campground.name }</h2>
            <div className='containerLocation'>
                <FontAwesomeIcon icon={['fas', 'location-dot']} className='locationIcon' />
                { campground.campground.location}
            </div>
            <p className="cardDescription">
               { campground.campground.description }
            </p>
            <PrimaryButton type='button' 
                title="Delete from favorites" 
                isLoading={  isLoadingDeleteFavorite } 
                classType='buttonSecundary'
                click={ () => deleteCampground(campground) }
            />
        </div>
    </div>
  );
}

export default CardFavorites;