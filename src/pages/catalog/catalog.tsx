import useCampgrounds from "../../hooks/campgrounds/useCampgrounds"
import { useEffect, useMemo, useState } from "react"
import LoaderCard from "../../components/common/loaders/LoadingCard"
import Input from "../../components/common/forms/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import PrimaryButton from "../../components/common/button/PrimaryButton"
import CatalogList from "../../components/catalog/catalogList"

interface SearchForm {
    search:string
}
function Catalog(){

    const { register, handleSubmit, setValue } = useForm<SearchForm>()
    const { campgrounds, loadingCampgrounds,  getCampgrounds} = useCampgrounds()
    const [ query, setQuery ] = useState('')
    
    const fetchMemoCampgrounds = useMemo(() => async () => {
        getCampgrounds(query)
      }, [query]);

    const checkKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            setValue('search', e.target.value)
        }
    };

    const searchCampground: SubmitHandler<SearchForm> = (data) => {
        setQuery(data.search)
    }

    useEffect(() => {
        fetchMemoCampgrounds();
      }, [query]);

    return (
        
        <section className="containerCatalog">
            <form onSubmit={handleSubmit(searchCampground)} onKeyDown={(e) => checkKeyDown(e)} className="containerSearch">
                <Input
                    type='text'
                    register={ register }
                    name='search'
                    placeholder="Search by name..."
                />
                <PrimaryButton 
                    type='submit'
                    title="Search"
                    isLoading={ loadingCampgrounds } 
                    click={ () => handleSubmit }
                />
            </form>
            
            { loadingCampgrounds ?
                <>
                    <LoaderCard height={311} />
                    <LoaderCard height={311} />
                    <LoaderCard height={311} />
                </>
            :
                <CatalogList campgrounds={campgrounds} />
            }
        </section>
        
        
        
    )
}

function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

export default Catalog