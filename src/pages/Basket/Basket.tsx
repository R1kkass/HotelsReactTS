import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { ContextPost } from "../../app/Context/ContextPost"
import { addBasket } from "../../entities/Redux/Store/basket"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import { CardApi, ICardApi } from "../../shared/api/CardApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CardLine from "../../shared/UI/Card/CardLine"
import "./Basket.scss"

const Basket = () => {

    const { count, basketSet, basket } = useContext(ContextPost)
    const dispatch = useDispatch()
    const bask:ICardApi[] = useSelector((state:any)=>state.basket.basket)

    useEffect(() => {
        dispatch(addBasket(JSON.parse(localStorage.getItem("basket") || "[]")))
        basketSet(JSON.parse(localStorage.getItem("basket") || "[]"))
    }, [count])

    return (
        <div className="Basket">
            <Breadcrumbs
                arr={[
                    { name: "Каталог", link: "/" },
                    { name: "Корзина", link: "/basket" }
                ]}
            />

            <h1>Корзина</h1>
            {bask?.map(
                ({
                    id,
                    code,
                    name,
                    price,
                    imgURL,
                    size,
                    brand,
                    manufacturer,
                    count
                }) => (
                    <CardLine
                        manufacturer={manufacturer}
                        code={code}
                        brand={brand}
                        price={price}
                        id={id}
                        name={name}
                        imgURL={imgURL}
                        size={size}
                        count={count}
                    />
                )
            )}
            {count ? (
                <div className="Basket__order">
                    <div>
                        <MyButton>Оформить заказ</MyButton>
                    </div>
                    <div>
                        <p>
                            {basket.reduce((key, count) => {
                                return (key += Number(count.price)*(count?.count || 1))
                            }, 0)}
                            ₸
                        </p>
                    </div>
                </div>
            ) : (
                <div className="Basket__order">
                    <h1>Корзина пуста</h1>
                </div>
            )}
        </div>
    )
}

export default Basket
