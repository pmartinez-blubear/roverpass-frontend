import CardFavorites from "../../../components/profile/favorites/cardFavorites"
import useFavoritePage from "../../../hooks/profile/useFavoritePage"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"
import { useFavorites } from "../../../contexts/favorites/favoritesContext"
import '../../../styles/profile/profile.css'
import ModalContainer from "../../../components/common/modal/Modal"
import { FavoriteCampground } from "../../../interfaces/campgrounds/campgroundsInterface"
import useDeleteFavoriteCampgrounds from "../../../hooks/campgrounds/useDeleteFavoriteCampground"


function ProfileFavorites() {

    const favoriteCampground = useFavorites()

    const { isLoadingDeleteFavorite, removeFavoriteCampground } = useDeleteFavoriteCampgrounds();

  

    const [ showModalDelelete, setShowModalDelete ] = useState(false)
    const [ tempCampground, setTempCampground ] = useState<FavoriteCampground | null>(null)
    const { getFavoritesCampgrounds } = useFavoritePage()

    useEffect(() => {
        getFavoritesCampgrounds()
    },[])

    const handleModalCampground = (campground:FavoriteCampground) => {
        setTempCampground(campground)
        setShowModalDelete(true)
    }

    const resetCampground = () => {
        setShowModalDelete(false)
        setTempCampground(null)
    }

    const handleDelete = () => {
        if(tempCampground) removeFavoriteCampground(tempCampground.id)
        setShowModalDelete(false)
    }

    return (
        <div className="containerProfile">
            <div className="containerMenuProfile">
                <button className="buttonMenuProfile selected">My Favorites</button>
            </div>
            <section className="containerProfileContent">
                <h1>My favorites campgrounds</h1>
                {
                    favoriteCampground?.favoritesCampgrounds && favoriteCampground?.favoritesCampgrounds.length > 0 ? 
                    <div className="containerCardsFavorites">
                        { 
                            favoriteCampground?.favoritesCampgrounds.map((campground) => 
                                <CardFavorites 
                                    key={campground.id} 
                                    campground={campground} 
                                    isLoadingDeleteFavorite={isLoadingDeleteFavorite}
                                    deleteCampground={ handleModalCampground }
                                />
                            ) 
                        }
                    </div> :
                    <div className="messageNoItems">
                        <FontAwesomeIcon icon={['fas', 'tents']} className='noItemIcon' />
                        <p>You do not have saved campgrounds</p>
                        <div className="containerButton">
                            <Link to="/" className="buttonPrimary">Discover campgrounds</Link>
                        </div>
                       
                    </div>
                }
            </section>
            <ModalContainer title="Delete favorite campground" isOpen={showModalDelelete} onClose={() => setShowModalDelete(false)}>
                <p>Are you sure you want to delete {tempCampground?.campground.name}? This action cannot be undone.</p>
                <div className="containerButtons">
                    <button className="buttonSecundary" onClick={handleDelete}>Delete</button>
                    <button className="buttonPrimary" onClick={resetCampground}>Cancel</button>
                </div>
            </ModalContainer>
        </div>
    )
}

export default ProfileFavorites