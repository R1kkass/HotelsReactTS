import './Pagination.scss'
import next from '../../shared/UI/SVG/Vector/Next.svg'
import prev from '../../shared/UI/SVG/Vector/Prev.svg'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ICardApi } from '../../shared/api/CardApi'
import { IRedux } from '../../app/Redux/Store/Index'


const Pagination = ()=>{
    
    const products = useSelector((state: IRedux)=>state.product.posts) 
    useEffect(()=>{
        products.length
    },[])

    return(
        <div className="Pagination">
            <button className='Pagination__button'>
                <img src={prev}/>
            </button>
            <div className='Pagination__pages'>
                <div className='Pagination__active'>1</div>
                <div>2</div>
            </div>
            <button className='Pagination__button'>
                <img src={next} alt="" />
            </button>
        </div>
    )
}

export default Pagination