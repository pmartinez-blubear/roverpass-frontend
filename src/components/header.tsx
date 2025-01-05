import { useEffect, useState } from 'react';
import RoverLogo from '../assets/roverpass_logo.svg'
import '../styles/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../contexts/auth/authContext';
import { Link } from 'react-router';
import LoggedHeader from './header/LoggedHeader';



function Header(){

    const auth = useAuth();

    return (
        <header>
            <nav className='containerMenu'>
                <img src={RoverLogo} alt="Rover Logo" />
                <Link to="/" className='btnMenu'>Campgrounds</Link>
            </nav>
            { auth?.user ? <LoggedHeader userEmail={auth.user.email} /> : <Link to="/signin" className='buttonPrimary btnLogin'>Sign In</Link>}
        </header>
    )
}



export default Header;