import MyButton from "../Buttons/MyButton/MyButton"
import basket from "../SVG/Basket/BasketWhite.svg"
import "./Card.scss"
import bottle from "../SVG/Weight/Bottle.svg"
import box from "../SVG/Weight/Box.svg"
import { FC, useContext } from "react"
import { ICardApi } from "../../api/CardApi"
import { ContextPost } from "../../../app/Context/ContextPost"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { addBasket } from "../../../entities/Redux/Store/basket"
import { Link } from "react-router-dom"

const Card: FC<ICardApi> = ({
    id,
    imgURL,
    name,
    price,
    manufacturer,
    code,
    brand,
    size,
}) => {
    const addBaskets = (post: any) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let posts = post
        posts.count = 1
        basket.push(posts)
        localStorage.setItem("basket", JSON.stringify(basket))
        dispatch(addBasket(basket))
    }
    const dispatch = useDispatch()

    return (
        <Link to={`/product/${id}`}>
            <div className="Card">
                <div className="Card__img">
                    <img src={imgURL} />
                </div>
                <div className="Card__weight">
                    <img src={bottle} />
                    {size} мл
                </div>
                <div className="Card__name">
                    <p>{name}</p>
                </div>
                <div className="Card__code">
                    <p>
                        Штрихкод: <span>{code}</span>
                    </p>
                    <p>
                        Производитель: <span>{manufacturer}</span>
                    </p>
                    <p>
                        Бренд: <span>{brand} </span>
                    </p>
                </div>
                <div className="Card__price">
                    <div className="Price">{price} T</div>
                    <div className="Button">
                        <MyButton
                            onClick={() => {
                                addBaskets({
                                    id,
                                    imgURL,
                                    name,
                                    price,
                                    manufacturer,
                                    code,
                                    brand,
                                    size,
                                })
                            }}
                        >
                            В корзину <img src={basket} alt="" />
                        </MyButton>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card
