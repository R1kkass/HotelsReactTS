import { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    AddCardApi,
    CardApi,
    EditCardApi,
    ICardApi,
} from "../../shared/api/CardApi"
import {
    FilterApi,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Modal from "../../shared/UI/Modal/Modal"

const EditModal: FC<{
    id: number
    visible: boolean
    setVisible: (bol: boolean) => void
    data?: ICardApi
}> = ({ id, visible, setVisible, data }) => {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ICardApi>()

    const onSubmit = (data: ICardApi) => {
        EditCardApi(id, data).then((e) => {
            setVisible(false)
            CardApi().then((e) => {
                dispatch(addPost(e.data))
            })
        })
    }

    const [type, setType] = useState<string[]>([])
    const [filtres, setFilter] = useState<IFilterApi[]>([])

    const refType = useRef<HTMLSelectElement>(null)
    const addType = () => {
        if (refType?.current?.value) {
            setType([...type, refType?.current?.value])
        }
    }

    useEffect(() => {
        FilterApi().then((e: IFilterApiData) => {
            setFilter(e.data)
            setVisible(false)
        })
    }, [])

    useEffect(() => {
        if (id) {
            setType(data?.type || [])
        }
        console.log(getValues())
    }, [id])

    const delte = (id: number) => {
        setType(
            type?.filter((key, i) => {
                return i != id
            })
        )
    }

    return (
        <>
            <Modal visible={visible} callback={() => setVisible(false)}>
                <div className="ModalAdd__form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Id товара: {id}</label>
                        </div>
                        <div>
                            <label>
                                Название
                                <input
                                    defaultValue={data?.name}
                                    placeholder="Название"
                                    {...register("name", {
                                        required: true,
                                        maxLength: 30,
                                        value: data?.name,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Размер
                                <input
                                    defaultValue={data?.size}
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
                                    defaultValue={data?.brand}
                                    placeholder="Бренд"
                                    {...register("brand", {
                                        required: true,
                                        min: 5,
                                        max: 15,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Штрихкод
                                <input
                                    type="number"
                                    defaultValue={data?.code}
                                    placeholder="Штрихкод"
                                    {...register("code", {
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Производитель
                                <input
                                    defaultValue={data?.manufacturer}
                                    placeholder="Производитель"
                                    {...register("manufacturer", {
                                        required: true,
                                        min: 5,
                                        max: 20,
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
                                    defaultValue={data?.imgURL}
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
                                    defaultValue={data?.description}
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
                            <div className="EditModal__params">
                                {type.map((key, id) => (
                                    <div key={key + id}>
                                        <p>{key}</p>
                                        <button onClick={() => delte(id)}>
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={(e) => {addType(); e.preventDefault()}}>Добавить в тип</button>
                        </div>
                        {Object.keys(errors).length ? (
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

export default EditModal
