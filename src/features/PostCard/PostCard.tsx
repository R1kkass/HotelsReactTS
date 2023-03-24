import { Fragment, useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports"
import { IRedux } from "../../app/Redux/Store/Index"
import { addPost } from "../../app/Redux/Store/product"
import { CardApi, ICardApi, ICardData } from "../../shared/api/CardApi"
import Card from "../../shared/UI/Card/Card"
import Loader from "../../shared/UI/Loader/Loader"

const PostCard = () => {
    const dispatch = useDispatch()
    const post: ICardApi[] = useSelector((state: IRedux) => state.product.posts)

    useEffect(() => {
        CardApi().then((e: ICardData) => {
            dispatch(addPost(e.data))
        })
    }, [])

    if (!post.length) {
        return (
            <Loader/>
        )
    }

    return (
        <>
            {post?.map(
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
                    <Fragment key={id}>
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
                    </Fragment>
                )
            )}
        </>
    )
}

export default PostCard
