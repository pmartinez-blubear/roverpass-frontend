import { useEffect, useState } from 'react';
import RoverLogo from '../assets/roverpass_logo.svg'
import '../styles/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../contexts/auth/authContext';
import { Link } from 'react-router';

const SUBMENU = [
    {id: 1, name: 'My Favorites', class: 'btn_submenu', type:'link', url:'/profile'},
    {id: 2, name: 'Log Out' , class: 'btn_submenu logout', type:'logout', url:''},
]

function Header(){

    const auth = useAuth();

    return (
        <header>
            <nav className='containerMenu'>
                <img src={RoverLogo} alt="Rover Logo" />
                <Link to="/" className='btnMenu'>Campgrounds</Link>
            </nav>
            { auth?.user ? LoggedHeader(auth?.user?.email ?? '') : <Link to="/signin" className='buttonPrimary btnLogin'>Sign In</Link>}
        </header>
    )
}

function LoggedHeader(props:string) {

    const auth = useAuth();
    

    const [ email, setEmail ] = useState(props);
    const [ showMenu, setShowMenu ] = useState(false);

    const handleSubmenuAction = (action:string) => {
        switch(action){
            case 'logout':
                auth?.handleShowModalLogout(true)
            break;
            default:
            return
        }

        setShowMenu(false)
    }
    
    return (
        <div className='containerLogged'>
            <div className='infoUser' onClick={() => setShowMenu(!showMenu)}>
                <p className='nameUser'>Welcome, { email }</p>
                <div className='iconUser'>
                    <FontAwesomeIcon icon={['fas', 'user']} className='colorIcon' />
                </div>
            </div>
            { showMenu && <div className='containerSubmenu'>
                {SUBMENU.map((item) => {
                    if(item.type === 'link') return <Link key={item.id} onClick={() => setShowMenu(false)} to={item.url} className={item.class}>{item.name}</Link>
                    return <button key={item.id} className={item.class} onClick={() => handleSubmenuAction(item.type)}>{item.name}</button> 
                })}
            </div>}
        </div>
    )
}

export default Header;