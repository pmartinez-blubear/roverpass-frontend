import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Campgrounds } from "../../interfaces/campgrounds/campgroundsInterface";
import CardCatalog from "./cardCatalog";

interface CatalogListProps {
    campgrounds:Campgrounds[],
}

function CatalogList({campgrounds = []}:CatalogListProps){
    return(
        <>
            {   campgrounds && campgrounds.length > 0 ? 
                <>
                { campgrounds.map((campground) => 
                    <CardCatalog 
                        key={campground.id} 
                        campground={campground}
                    /> 
                )}
                </>
                :
                <>
                    <div className="messageNoItems">
                        <FontAwesomeIcon icon={['fas', 'tents']} className='noItemIcon' />
                        <h2>0 matches found!</h2>
                        <p>Please ensure that you have typed the search term correctly. Try using more general terms to broaden your search.</p>                            
                    </div>
                </>

            }
            
        </>
    )
}

export default CatalogList