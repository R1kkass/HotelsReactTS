import './Pagination.scss'
import next from '../../shared/UI/SVG/Vector/Next.svg'
import prev from '../../shared/UI/SVG/Vector/Prev.svg'


const Pagination = ()=>{
    
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