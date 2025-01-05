import '../../../styles/common/loaders.css'

interface LoaderCardProps {
    height: number;
}
function LoaderCard ( { height}:LoaderCardProps) {
    return <div className='loaderCard' style={{height:`${height}px`}}></div> 
}

export default LoaderCard;