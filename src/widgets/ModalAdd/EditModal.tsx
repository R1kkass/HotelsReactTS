import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    AddCardApi,
    CardApi,
    EditCardApi,
    ICardApi,
} from "../../shared/api/CardApi"
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
    } = useForm<ICardApi>()

    const onSubmit = (data: ICardApi) => {
        EditCardApi(id, data).then((e) => {
            setVisible(false)
            CardApi().then((e) => {
                dispatch(addPost(e.data))
            })
        })
    }

    return (
        <>
            <Modal visible={visible} callback={() => setVisible(false)}>
                <div className="ModalAdd__form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>
                                Название
                                <input
                                    defaultValue={data?.name}
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
                                    defaultValue={data?.size}
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
                                    defaultValue={data?.code}
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
                                    defaultValue={data?.price}
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
                                    defaultValue={data?.discription}
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

export default EditModal
