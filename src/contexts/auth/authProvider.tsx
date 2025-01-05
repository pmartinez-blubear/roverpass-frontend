import { AuthContext } from "./authContext"; 
import useProvideAuth from "../../hooks/auth/useProvideAuth";

const ProviderAuth = ({ children }: any) => {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={ auth }>
            { children }
        </AuthContext.Provider>
    );
}

export { ProviderAuth, useProvideAuth };