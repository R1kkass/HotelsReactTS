import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { ICardApi } from "../../shared/api/CardApi"
import {
    FilterApi,
    FilterApiPost,
    IArray,
    IFilterApi,
} from "../../shared/api/FilterApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Modal from "../../shared/UI/Modal/Modal"



const ModalAddFilter = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [paramFilter, setParamFilter] = useState<IArray[]>([])

    const refName = useRef<HTMLInputElement>(null)
    const refSize = useRef<HTMLInputElement>(null)

    const deleteCategory = (id: number) => {
        setParamFilter(
            paramFilter?.filter((param, i) => {
                return i != id
            })
        )
    }

    const addCategory = () => {
        if (refSize?.current?.value) {
            setParamFilter([...paramFilter, { name: refSize?.current?.value }])
        }
    }

    const addParam = () => {
        if (refName?.current?.value && paramFilter.length) {
            const r: IFilterApi = {
                title: refName?.current?.value || "",
                array: paramFilter,
            }
            FilterApiPost(r).then((e) => {})
        }
    }

    

    return (
        <>
            <MyButton onClick={() => setVisible(true)}>
                Добавить фильтер
            </MyButton>
            <Modal visible={visible} callback={() => setVisible(false)}>
                <div className="ModalAdd__form">
                    <form>
                        <div>
                            <label>
                                Название
                                <input placeholder="Название" ref={refName} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Подкатегория
                                <input
                                    placeholder="Подкатегория"
                                    ref={refSize}
                                />
                            </label>
                        </div>

                        {paramFilter?.map((key, i) => (
                            <div className="Category">
                                <label>{key.name}</label>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        deleteCategory(i)
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                addCategory()
                            }}
                        >
                            Добавить фильтер
                        </button>
                        <input onClick={(e)=>{e.preventDefault();addParam()}} type="submit" />
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ModalAddFilter
