import MyButton from "../Buttons/MyButton/MyButton"
import deletes from "../SVG/Delete/Delete.svg"
import { ICardApi } from "../../api/CardApi"
import { FC, useContext } from "react"
import { ContextPost } from "../../../app/Context/ContextPost"
import "./CardLine.scss"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { addBasket } from "../../../entities/Redux/Store/basket"
import Count from "../Count/Count"

const CardLine: FC<ICardApi> = ({ id, name, price, imgURL, size, count }) => {
     const dispatch = useDispatch()

    const countFn = (id: number) => {
        let baskets = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = baskets.map((key: ICardApi) => {
            if (key.id == id) {
                console.log(id == key.id)

                key.count = (key?.count || 1) + 1
            }
            return key
        })
        localStorage.setItem("basket", JSON.stringify(res))
        dispatch(addBasket(res))
    }

    const deletePost = (id: number) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = basket.filter((key: ICardApi) => {
            return key.id != id
        })
        localStorage.setItem("basket", JSON.stringify(res))
        dispatch(addBasket(res))
    }

    const countFnMin = (id: number) => {
        let baskets = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = baskets.map((key: ICardApi) => {
            if (key.id == id) {
                console.log(id == key.id)

                key.count = (key?.count || 1) - 1
            }
            return key
        })
        localStorage.setItem("basket", JSON.stringify(res))
        dispatch(addBasket(res))
    }

    return (
        <div className="CardLine__product">
            <div className="CardLine__img">
                <img src={imgURL} />
            </div>
            <div className="CardLine__info">
                <p>{size}</p>
                <p>{name}</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Facere, inventore.
                </p>
            </div>
            <div className="CardLine__count">
                <Count
                    count={count || 1}
                    onClickMinus={() => countFnMin(id)}
                    onClickPlus={() => countFn(id)}
                />
            </div>
            <div className="CardLine__price">
                <p>{price}₸</p>
            </div>
            <div className="CardLine__delete">
                <MyButton onClick={() => deletePost(id)}>
                    <img src={deletes} alt="" />
                </MyButton>
            </div>
        </div>
    )
}

export default CardLine
