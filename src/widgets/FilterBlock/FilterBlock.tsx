import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { filterPost } from "../../app/Redux/Store/product"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CheckBox from "../../shared/UI/CheckBox/CheckBox"
import MyInput from "../../shared/UI/Input/MyInput"
import deletes from "../../shared/UI/SVG/Delete/Delete.svg"
import Price from "../Price/Price"

type IManufac = {
    name: string
    count: string
}

const manufac: IManufac[] = [
    {
        name: "Grifon",
        count: "33",
    },
    {
        name: "Boyscout",
        count: "66",
    },
    {
        name: "Paclan",
        count: "166",
    },
    {
        name: "Булгари Грин",
        count: "166",
    },
]

const brand: IManufac[] = [
    {
        name: "Nivea",
        count: "33",
    },
    {
        name: "GRIFON",
        count: "66",
    },
    {
        name: "Домашний сундук",
        count: "166",
    },
    {
        name: "HELP",
        count: "166",
    },
]

const FilterBlock = () => {
    const [brands, setBrands] = useState(brand)
    const [manuf, setManuf] = useState(manufac)

    const [searchPrams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()

    const [brandsParam, setBrandsParam] = useState<string[]>([])
    const [manufParam, setManufParam] = useState<string[]>([])

    const change = (value: any) => {
        setBrands(
            brand.filter((e) => {
                return e.name.includes(value)
            })
        )
    }

    const changeMan = (value: any) => {
        setManuf(
            manufac.filter((e) => {
                return e.name.includes(value)
            })
        )
    }

    const pushMan = (name: string) => {
        if (JSON.parse(searchPrams.get("manufParam") || "[]").includes(name)) {
            setManufParam(
                manufParam.filter((manum) => {
                    return manum != name
                })
            )
            searchPrams.set(
                "manufParam",
                JSON.stringify(
                    manufParam.filter((manum) => {
                        return manum != name
                    })
                )
            )
            setSearchParams(searchPrams)
        } else {
            const setArr = new Set(manufParam)
            setArr.add(name)
            setManufParam([...setArr])
            searchPrams.set(
                "manufParam",
                JSON.stringify([...setArr])
                )
            
            setSearchParams(searchPrams)
        }
        dispatch(filterPost(searchPrams))
    }

    const pushBrand = (name: string) => {
        if (JSON.parse(searchPrams.get("brandParam") || "[]").includes(name)) {
            setBrandsParam(
                brandsParam.filter((manum) => {
                    return manum != name
                })
            )
            searchPrams.set(
                "brandParam",
                JSON.stringify(
                    brandsParam.filter((manum) => {
                        return manum != name
                    })
                )
            )
            setSearchParams(searchPrams)
        } else {
            const setArr = new Set(brandsParam)
            setArr.add(name)
            setBrandsParam([...setArr])
            searchPrams.set(
                "brandParam",
                JSON.stringify([...setArr])
                )
            
            setSearchParams(searchPrams)
        }
        dispatch(filterPost(searchPrams))
    }

    return (
        <>
            <div className="LeftBlockCatalog__text">
                <h4>ПОДБОР ПО ПАРАМЕТРАМ</h4>
            </div>
            <div className="LeftBlockCatalog__price">
                <p>Цена</p>
            </div>
            <Price />
            <div className="LeftBlockCatalog__text">
                <h4>Производитель</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput callback={changeMan} />
                {manuf?.map(({ name, count }) => (
                    <CheckBox
                        checked={JSON.parse(
                            searchPrams.get("manufParam") || "[]"
                        ).includes(name)}
                        callback={() => pushMan(name)}
                        text={name}
                        count={count}
                    />
                ))}

                <p className="more">Показать всё</p>
            </div>
            <div className="LeftBlockCatalog__text">
                <h4>Бренд</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput callback={change} />

                {brands?.map(({ name, count }) => (
                    <CheckBox
                        callback={() => pushBrand(name)}
                        checked={JSON.parse(
                            searchPrams.get("brandParam") || "[]"
                        ).includes(name)}
                        text={name}
                        count={count}
                    />
                ))}
                <p className="more">Показать всё</p>
                <div className="InputButton">
                    <MyButton>Показать</MyButton>
                    <MyButton>
                        <img src={deletes} />
                    </MyButton>
                </div>
            </div>
        </>
    )
}

export default FilterBlock
