import MyButton from "../Buttons/MyButton/MyButton"
import basket from "../SVG/Basket/BasketWhite.svg"
import "./Card.scss"
import bottle from "../SVG/Weight/Bottle.svg"
import box from "../SVG/Weight/Box.svg"
import { FC, useContext, useEffect, useState } from "react"
import { ICardApi } from "../../api/CardApi"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { addBasket } from "../../../app/Redux/Store/basket"
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
    const [type, setType] = useState<boolean>(true)
    const addBaskets = (post: any) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let posts = post
        posts.count = 1
        basket.push(posts)
        localStorage.setItem("basket", JSON.stringify(basket))
        dispatch(addBasket(basket))
        setType(false)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        let res = []
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        for(let i=0; i<basket.length; i++){
            res.push(basket[i].id)
        }

        if (res?.includes(id)) {
            setType(false)
            
        }
    }, [])

    return (
        <div className="Card">
            <Link to={`/product/${id}`}>
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
            </Link>
            <div className="Card__price">
                <div className="Price">{price} T</div>

                <div className="Button">
                    {type ? (
                        <MyButton
                            onClick={(e: React.MouseEvent) => {
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
                    ) : (
                        <Link to="/basket">
                            <MyButton>
                                К корзине <img src={basket} alt="" />
                            </MyButton>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
