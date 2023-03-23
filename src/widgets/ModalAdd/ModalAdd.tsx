import { useState } from "react"
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

const ModalAdd = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardApi>()
    const onSubmit = (data: ICardApi) => {
        AddCardApi(data).then((e) => {
            setVisible((p) => !p)
            CardApi().then((e: ICardData) => {
                dispatch(addPost(e.data))
            })
        })
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
                                        min: 3,
                                        max: 10,
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
                                    placeholder="Штрихкод"
                                    {...register("code", {
                                        required: true,
                                        min: 5,
                                        max: 15,
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
                                    placeholder="Цена"
                                    {...register("price", {
                                        required: true,
                                        min: 3,
                                        max: 10,
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
                                    {...register("discription", {
                                        required: true,
                                        min: 5,
                                        max: 99,
                                    })}
                                />
                            </label>
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

export default ModalAdd