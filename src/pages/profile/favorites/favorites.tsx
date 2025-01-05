import CardFavorites from "../../../components/profile/favorites/cardFavorites"
import useFavoritePage from "../../../hooks/profile/useFavoritePage"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"
import { useFavorites } from "../../../contexts/favorites/favoritesContext"
import '../../../styles/profile/profile.css'


function ProfileFavorites() {

    const favoriteCampground = useFavorites()

    const { getFavoritesCampgrounds } = useFavoritePage()

    useEffect(() => {
        getFavoritesCampgrounds()
    },[])

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
                        { favoriteCampground?.favoritesCampgrounds.map((campground) => <CardFavorites key={campground.id} campground={campground} />) }
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
        </div>
    )
}

export default ProfileFavorites