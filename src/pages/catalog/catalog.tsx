import CardCatalog from "../../components/catalog/cardCatalog"
import useCampgrounds from "../../hooks/campgrounds/useCampgrounds"
import { useEffect } from "react"
import { useFavorites } from "../../contexts/favorites/favoritesContext"
function Catalog(){

    const { campgrounds, getCampgrounds} = useCampgrounds()
    const favoriteCampground = useFavorites()
    
    useEffect(() => {
        getCampgrounds()
    },[])

    return (
        
        <section className="containerCatalog">
            { campgrounds.map((campground) => 
                <CardCatalog 
                    key={campground.id} 
                    campground={campground} 
                    favoriteCampground={favoriteCampground?.favoritesCampgrounds}
                /> 
            )}
        </section>
        
    )
}

export default Catalog