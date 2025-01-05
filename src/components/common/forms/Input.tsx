import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
    label: string,
    type: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?:string;
    change?:()=>void;
    options?:RegisterOptions;
}

const Input = ({ label, type = 'text', name, register, placeholder, error, change, options }:InputProps) => {

    const [ typeInput, setTypeInput ] = useState(type)

    const changeTypeInput = () => {
        setTypeInput((prevType) => (prevType === 'password' ? 'text' : 'password'));
    }

    return (
        <fieldset className='inputContainer'>
            <label htmlFor={name}>{label}</label>
            <div className='containerInput'>
                <input
                    id={name}
                    type={typeInput}
                    {...register(name, options)}
                    placeholder={ placeholder }
                    className="inputStyle"
                    onChange={ change }
                />
                {
                    type === 'password' &&
                    <FontAwesomeIcon 
                        icon={['fas', `${typeInput === 'password' ? 'eye-slash' : 'eye'}`]} 
                        className={`passwordEyeIcon ${typeInput === 'password' ? '' : 'active'}`}
                        onClick={ changeTypeInput } 
                    />
                }
            </div>
            { error && <span className='errorMessage'>{ error }</span>}
        </fieldset>
       
    );
};

export default Input;