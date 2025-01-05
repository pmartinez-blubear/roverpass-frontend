import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/forms/Input";
import { useAuth } from "../../contexts/auth/authContext";
import { LoginForm } from "../../interfaces/login/LoginInterface";
import PrimaryButton from "../common/button/PrimaryButton";
import ErrorMessage from "../common/error/ErrorMessage";

function FormSignin () {
    const auth = useAuth();
    
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    const LoginUser: SubmitHandler<LoginForm> = (data) => {
        auth?.login(data)
    }
    
    return(
        <div className='formContainer'>
            <form onSubmit={ handleSubmit(LoginUser) }>
                <Input
                    type='email'
                    register={ register }
                    name='email_address'
                    label='Email'
                    error={errors?.email_address?.message ?? ''}
                    placeholder="example@roverpass.com"
                    options={{
                        required:'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    }}
                />
                <Input
                    type='password'
                    register={ register }
                    name='password'
                    label='Password'
                    placeholder="*******"
                    error={errors?.password?.message ?? ''}
                    options={{ required:'Password is required'}}
                />
                { auth?.errorAuth && <ErrorMessage error={auth.errorAuth} /> }
                <PrimaryButton type='submit' title="Sign in" isLoading={auth?.isLoadingAuth} click={ () => handleSubmit }/>
                <a href='#' className='forgotPassword'>Forgot your password?</a>
            </form>
        </div>
    )
}

export default FormSignin