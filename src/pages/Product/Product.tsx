import { useDebugValue, useEffect, useState } from "react"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Count from "../../shared/UI/Count/Count"
import "./Product.scss"
import share from "../../shared/UI/SVG/Share/Share.svg"
import basket from "../../shared/UI/SVG/Basket/BasketWhite.svg"
import downloadBlack from "../../shared/UI/SVG/Download/DownloadBlack.svg"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { CardApi, ICardApi } from "../../shared/api/CardApi"
import { addBasket } from "../../entities/Redux/Store/basket"

const Product = () => {
    const [count, setCount] = useState<number>(1)
    const [prod, setProd] = useState<ICardApi[]>([])
    const countMin = () => {
        if (count > 1) {
            setCount((p) => p - 1)
        }
    }
    const params = useParams()

    useEffect(() => {
        CardApi().then((e: any) => {
            let res = e.data.filter((key: ICardApi) => {
                return key.id == Number(params.id) || 0
            })
            setProd(res)
        })
    }, [])

    const addBaskets = (post: any) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let posts = post
        posts.count = count
        basket.push(posts)
        localStorage.setItem("basket", JSON.stringify(basket))
        dispatch(addBasket(basket))
    }
    const dispatch = useDispatch()

    return (
        <div className="Container">
            <Breadcrumbs
                arr={[
                    { name: "Каталог", link: "/" },
                    { name: `${prod[0]?.name}`, link: `/${params.id}` },
                ]}
            />
            <div className="Product">
                <div className="Product__img">
                    <img src="https://ir.ozone.ru/s3/multimedia-y/wc1000/6423305530.jpg"></img>
                </div>
                <div className="Product__info">
                    <div className="Product__type">
                        <p>В наличии</p>
                    </div>
                    <div className="Product__name">
                        <p>
                            {prod[0]?.name}
                        </p>
                    </div>
                    <div className="Product__weight">
                        <p>{prod[0]?.size}</p>
                    </div>
                    <div className="Product__price">
                        <div className="Price">
                            <h2>{prod[0]?.price} ₸</h2>
                        </div>
                        <div className="Count">
                            <Count
                                count={count}
                                onClickMinus={() => {
                                    countMin()
                                }}
                                onClickPlus={() => {
                                    setCount((p) => p + 1)
                                }}
                            />
                        </div>
                        <div className="Button">
                            <MyButton
                                onClick={() => {
                                    addBaskets(prod[0])
                                }}
                            >
                                В корзину <img src={basket} />
                            </MyButton>
                        </div>
                    </div>
                    <div className="Product__buttons">
                        <div className="Share">
                            <img src={share} />
                        </div>
                        <div className="Promotion">
                            <p>
                                При покупке от 10 000 ₸ бесплатная доставка по
                                Кокчетаву и области
                            </p>
                        </div>
                        <div className="PriceList">
                            <p>
                                Прайс-лист <img src={downloadBlack} />
                            </p>
                        </div>
                    </div>
                    <div className="Product__brand"></div>
                    <div className="Product__discription"></div>
                    <div className="Product__characteristics"></div>
                </div>
            </div>
        </div>
    )
}

export default Product
