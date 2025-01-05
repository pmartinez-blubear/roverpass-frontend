interface ErrorProps {
    error:string;
}

function ErrorMessage({ error }: ErrorProps) {
    return (
        <div className="errorContainer">
            <span className='errorMessage'>{ error }</span>
        </div> 
    )
}

export default ErrorMessage