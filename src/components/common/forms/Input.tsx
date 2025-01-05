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
    return (
        <fieldset className='inputContainer'>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                {...register(name, options)}
                placeholder={ placeholder }
                className="inputStyle"
                onChange={ change }
            />
            { error && <span className='errorMessage'>{ error }</span>}
        </fieldset>
       
    );
};

export default Input;