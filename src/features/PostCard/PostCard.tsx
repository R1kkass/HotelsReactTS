import { Fragment, useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports"
import { addPost } from "../../app/Redux/Store/product"
import { CardApi, ICardApi } from "../../shared/api/CardApi"
import Card from "../../shared/UI/Card/Card"

const PostCard = () => {
    const dispatch = useDispatch()
    const post: ICardApi[] = useSelector((state: any) => state.product.posts)

    useEffect(() => {
        CardApi().then((e: any) => {
            dispatch(addPost(e.data))
        })
    }, [])

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
