
import '../../../styles/common/loaders.css'

interface LoaderCircleProps {
    color?: 'buttonPrimary' | 'buttonSecundary';
}
function LoaderCircle ( { color = 'buttonPrimary'}:LoaderCircleProps) {
    return <div className={`loaderCircle ${color}`}></div> 
}

export default LoaderCircle;