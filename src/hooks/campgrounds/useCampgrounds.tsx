import {  useState } from "react";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { Campgrounds } from "../../interfaces/campgrounds/campgroundsInterface";
import { handleError } from "../../utils/errorMessages";

const axiosPetition = axiosRequestInterceptor();

const useCampgrounds = () => {
    const [ campgrounds, setCampgrounds ] = useState<Campgrounds[]>([]);
    const [ loadingCampgrounds, setLoginCampgrounds ] = useState(false)
    const [ errorFavorite, setErrorFavorite ] = useState('');

    const getCampgrounds = async (query: string = '') => {
        setLoginCampgrounds(true)
        const data = await axiosPetition.get<Campgrounds[]>(`/campgrounds.json?query=${query}`)
        .catch((error) => {
            setErrorFavorite(handleError(error));
        }).finally(()=>{
            setLoginCampgrounds(false)
        });

         if(data){
            setCampgrounds(data.data)
         } 
    }

    return {
        campgrounds,
        loadingCampgrounds,
        errorFavorite,
        getCampgrounds
    }
}

export default useCampgrounds;