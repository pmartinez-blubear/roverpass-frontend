import {  useState } from "react";
import { axiosRequestInterceptor } from "../../interceptor/axios";
import { Campgrounds } from "../../interfaces/campgrounds/campgroundsInterface";
import { handleError } from "../../utils/errorMessages";

const axiosPetition = axiosRequestInterceptor();

const useCampgrounds = () => {
    const [ campgrounds, setCampgrounds ] = useState<Campgrounds[]>([]);
    const [ errorFavorite, setErrorFavorite ] = useState('');

    const getCampgrounds = async () => {
        const data = await axiosPetition.get<Campgrounds[]>('/campgrounds.json').catch((error) => {
            setErrorFavorite(handleError(error));
          });

         if(data){
            setCampgrounds(data.data)
         } 
    }

    return {
        campgrounds,
        errorFavorite,
        getCampgrounds
    }
}

export default useCampgrounds;