import RoverLogo from '../assets/roverpass_logo.svg'
import '../styles/header.css'
import { useAuth } from '../contexts/auth/authContext';
import { Link, NavLink } from 'react-router';
import LoggedHeader from './header/LoggedHeader';
import { useState } from 'react';

function Header(){

    const auth = useAuth();

    const [ toggleMenu, setToggleMenu ] = useState(false)

    return (
        <header>
            <div className='containerMenu'>
                <div className='sectionLeft'>
                    <button onClick={() => setToggleMenu(!toggleMenu)} className={`hamburgerMenu ${toggleMenu ? 'active' : ''}`} type='button' aria-label='menu'>
                        <span>&nbsp;</span>
                    </button>
                    <Link to="/"><img src={RoverLogo} alt="Rover Logo" /></Link>
                    <nav className={`navContainer ${toggleMenu ? 'active' : ''}`}>
                        <NavLink to="/" className='btnMenu'>List Campgrounds</NavLink>
                        <a href='https://www.roverpass.com/owner/login' target='_blank' className='btnMenu'>Owner Login</a>
                    </nav>
                </div>               
            </div>
            { auth?.user ? <LoggedHeader userEmail={auth.user.email} /> : <Link to="/signin" className='buttonPrimary btnLogin'>Sign In</Link>}
        </header>
    )
}

export default Header;