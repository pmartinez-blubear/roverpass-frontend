import LayoutPage from "../../layouts/layout"
import CardCatalog from "../../components/catalog/cardCatalog"
import useCampgrounds from "../../hooks/campgrounds/useCampgrounds"
import { useEffect } from "react"
import useProviderFavorites from "../../hooks/campgrounds/useProviderFavorites"
function Catalog(){

    const { campgrounds, getCampgrounds} = useCampgrounds()
    const { favoritesCampgrounds } = useProviderFavorites()
    
    useEffect(() => {
        getCampgrounds()
    },[])

    return (
        
        <section className="containerCatalog">
            { campgrounds.map((campground) => <CardCatalog 
                key={campground.id} 
                campground={campground} 
                isSaved={favoritesCampgrounds.find((camp)=>camp.id === campground.id)} /> 
            )}
        </section>
        
    )
}

export default Catalog