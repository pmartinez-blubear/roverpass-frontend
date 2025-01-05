import { useState } from "react";
import { useAuth } from "../../contexts/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const SUBMENU = [
    {id: 1, name: 'My Favorites', class: 'btn_submenu', type:'link', url:'/profile'},
    {id: 2, name: 'Log Out' , class: 'btn_submenu logout', type:'logout', url:''},
]

interface LoggerHeaderInterface {
    userEmail:string
}
function LoggedHeader({userEmail}:LoggerHeaderInterface) {

    const auth = useAuth();
    const [ email, setEmail ] = useState(userEmail);
    const [ showMenu, setShowMenu ] = useState(false);

    const handleSubmenuAction = (action:string) => {
        if (action === 'logout') {
            auth?.handleShowModalLogout(true);
        }

        setShowMenu(false)
    }
    
    return (
        <div className='containerLogged'>
            <div data-testid="loggedButton" className='infoUser' onClick={() => setShowMenu(!showMenu)}>
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

export default LoggedHeader