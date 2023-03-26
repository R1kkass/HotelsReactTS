import { useEffect, useRef, useState } from "react"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Modal from "../../shared/UI/Modal/Modal"
import { useForm } from "react-hook-form"
import {
    AddCardApi,
    CardApi,
    ICardApi,
    ICardData,
} from "../../shared/api/CardApi"
import "./ModalAdd.scss"
import { useDispatch } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    FilterApi,
    IArray,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"

const ModalAdd = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()
    const [type, setType] = useState<string[]>([])
    const [filtres, setFilter] = useState<IFilterApi[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardApi>()
    const onSubmit = (data: ICardApi) => {
        const obj = { ...data, type: type }
        AddCardApi(obj).then((e) => {
            setVisible((p) => !p)
            CardApi().then((e: ICardData) => {
                dispatch(addPost(e.data))
            })
        })
    }
    const refType = useRef<HTMLSelectElement>(null)

    const addType = () => {
        if (refType?.current?.value) {
            setType([...type, refType?.current?.value])
        }
    }

    useEffect(() => {
        FilterApi().then((e: IFilterApiData) => {
            setFilter(e.data)
        })
    }, [])

    const delte = (id: number)=>{
        setType(type.filter((key,i)=>{
            return i!=id
        }))
    }

    return (
        <>
            <MyButton
                onClick={() => {
                    setVisible((p) => !p)
                }}
            >
                Добавить продукт
            </MyButton>
            <Modal
                visible={visible}
                callback={() => {
                    setVisible((p) => !p)
                }}
            >
                <div className="ModalAdd__form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>
                                Название
                                <input
                                    placeholder="Название"
                                    {...register("name", {
                                        required: true,
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Размер
                                <input
                                    placeholder="Размер"
                                    {...register("size", {
                                        required: true,
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Бренд
                                <input
                                    placeholder="Бренд"
                                    {...register("brand", {
                                        required: true,
                                        min: 3,
                                        max: 20,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Штрихкод
                                <input
                                    type="number"
                                    placeholder="Штрихкод"
                                    {...register("code", {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Производитель
                                <input
                                    placeholder="Производитель"
                                    {...register("manufacturer", {
                                        required: true,
                                        min: 5,
                                        max: 99,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Цена
                                <input
                                    type="number"
                                    placeholder="Цена"
                                    {...register("price", {
                                        required: true,
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                URL картинки
                                <input
                                    placeholder="URL картинки"
                                    {...register("imgURL", {
                                        required: true,
                                        min: 5,
                                        max: 99,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Описание
                                <input
                                    placeholder="Описание"
                                    {...register("description", {
                                        required: true,
                                        min: 5,
                                        max: 99,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Тип
                                <select ref={refType}>
                                    {filtres?.map((filter) => (
                                        <option key={filter.id}>
                                            {filter.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div>
                                {type.map((key, i) => (
                                    <div key={key}>
                                        <p>{key}</p>
                                        <button onClick={()=>delte(i)}>Удалить</button>
                                    </div>
                                ))}
                            </div>
                            <div onClick={() => addType()}>Добавить в тип</div>
                        </div>
                        {Object.keys(errors).length || type.length ? (
                            <span>Поля пусты</span>
                        ) : (
                            ""
                        )}
                        <input type="submit" />
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ModalAdd
