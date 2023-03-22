import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports"
import { ContextPost } from "../../app/Context/ContextPost"
import { addBasket } from "../../entities/Redux/Store/basket"
import { addPost } from "../../entities/Redux/Store/product"
import { CardApi, ICardApi } from "../../shared/api/CardApi"
import Card from "../../shared/UI/Card/Card"

const PostCard = () => {
    const dispatch = useDispatch()
    const post:ICardApi[] = useSelector((state:any)=>state.product.posts) 

    useEffect(()=>{
        CardApi().then((e:any)=>{
            dispatch(addPost(e.data))
        })
    },[])

    return (
        <>
            {post.map(
                ({
                    id,
                    imgURL,
                    name,
                    price,
                    manufacturer,
                    code,
                    brand,
                    size,
                }) => (
                    <Card
                        id={id}
                        imgURL={imgURL}
                        name={name}
                        price={price}
                        manufacturer={manufacturer}
                        code={code}
                        brand={brand}
                        size={size}
                    />
                )
            )}
        </>
    )
}

export default PostCard