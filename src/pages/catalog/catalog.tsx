import CardCatalog from "../../components/catalog/cardCatalog"
import useCampgrounds from "../../hooks/campgrounds/useCampgrounds"
import { Suspense, useEffect } from "react"
import { useFavorites } from "../../contexts/favorites/favoritesContext"



function Catalog(){

    const { campgrounds, getCampgrounds} = useCampgrounds()
    const favoriteCampground = useFavorites()
    
    useEffect(() => {
        getCampgrounds()
    },[])

    return (
        <Suspense fallback={<Loading />}>
            <section className="containerCatalog">
                { campgrounds.map((campground) => 
                    <CardCatalog 
                        key={campground.id} 
                        campground={campground} 
                        favoriteCampground={favoriteCampground?.favoritesCampgrounds}
                    /> 
                )}
            </section>
        </Suspense>
        
        
    )
}

function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

export default Catalog