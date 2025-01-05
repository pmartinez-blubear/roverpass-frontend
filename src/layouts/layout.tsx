import Header from "../components/header"
import ModalContainer from "../components/common/modal/Modal"
import { useAuth } from "../contexts/auth/authContext"
import { useEffect, useState } from "react"
import FormSignin from "../components/signin/FormSignin"
import '../styles/layout/layout.css'


function LayoutPage({children}: {children: React.ReactNode}) {

    const auth = useAuth()

    const [showModalLogin, setShowModalLogin] = useState(auth?.showModalLogin || false)
    const [showModal, setShowModal] = useState(auth?.showModalLogout || false)
    
    useEffect(() => {
        setShowModal(auth?.showModalLogout || false)
    }, [auth?.showModalLogout])

    useEffect(() => {
        setShowModalLogin(auth?.showModalLogin || false)
    }, [auth?.showModalLogin])

    return (
        <main className="layoutPage">
            <Header />
            <div className="containerPage">
                {children}
            </div>
            <ModalContainer title="Sign Out" isOpen={showModal} onClose={() => auth?.handleShowModalLogout(false)}>
                <p>Are you sure you would like to sign out of your account?</p>
                <div className="containerButtons">
                    <button className="buttonSecundary" onClick={() => auth?.logout()}>Sign out</button>
                    <button className="buttonPrimary" onClick={() => auth?.handleShowModalLogout(false)}>Cancel</button>
                </div>
            </ModalContainer>

            <ModalContainer title="Sign in" isOpen={showModalLogin} onClose={()=> auth?.handleShowModalLogin(false)}>
                <FormSignin />
            </ModalContainer>
        </main>
    )
}

export default LayoutPage