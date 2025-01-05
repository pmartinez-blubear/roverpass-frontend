import RoverLogo from '../../assets/roverpass_logo.svg'
import BackgroundLogin from '../../assets/background_login.jpg'
import FormSignin from '../../components/signin/FormSignin'
import '../../styles/login/login.css'

function Login(){
    return (
        <main className="containerLogin">
            <section className='containerForm'>
                <img src={RoverLogo} alt="Rover Logo" className='logo logoSignIn'/>
                <FormSignin />
            </section>
            <section className='backgroundImage'>
                <img src={BackgroundLogin} alt="Background Login"/>
            </section>
        </main>
    )
}

export default Login