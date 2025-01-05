import { FavoritesContext } from "./favoritesContext";
import useProviderFavorites from "../../hooks/campgrounds/useProviderFavorites";

const ProviderFavorites = ({ children }: any) => {
    const favorites = useProviderFavorites();

    return (
        <FavoritesContext.Provider value={ favorites }>
            { children }
        </FavoritesContext.Provider>
    );
}

export {ProviderFavorites, useProviderFavorites };