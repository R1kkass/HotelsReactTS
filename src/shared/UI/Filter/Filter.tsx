import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { IRedux } from "../../../app/Redux/Store/Index"
import { addPost, filterPost } from "../../../app/Redux/Store/product"
import { FilterApi, IFilterApi, IFilterApiData } from "../../api/FilterApi"
import "./Filter.scss"

const Filter = () => {
    const [filtres, setFilter] = useState<IFilterApi[]>([])
    const product  = useSelector((state:IRedux)=>state.product.posts)
    const dispatch = useDispatch()
    const history = new URLSearchParams();
    const filterProductw = (param: string)=>{
        
        const prodLocal = JSON.parse(localStorage.getItem('products') || '[]')
        console.log(prodLocal);
        
        let res = prodLocal.filter((prod: any)=>{
            console.log(prod?.type);
            
            return prod?.type.includes(param)
        })
        // dispatch(filterPost(sear))
        history.append('filter', param)
    }


    useEffect(() => {
        FilterApi().then((e: IFilterApiData) => {
            setFilter(e.data)
        })
    }, [])

    return (
        <div className="Filter">
            {filtres?.map(({ title, array, id }) => (
                <>
                    <div className="Filter__block">
                        <h3 onClick={()=>filterProductw(title)}>{title}</h3>
                    
                    {array?.map(({ name }) => (
                        <div className="Filter__text">
                            <p >{name}</p>
                        </div>
                    ))}
                    </div>
                </>
            ))}
        </div>
    )
}

export default Filter
