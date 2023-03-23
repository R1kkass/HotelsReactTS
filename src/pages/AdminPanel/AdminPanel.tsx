import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    CardApi,
    DeleteCardApi,
    ICardApi,
    ICardData,
} from "../../shared/api/CardApi"
import EditModal from "../../widgets/ModalAdd/EditModal"
import ModalAdd from "../../widgets/ModalAdd/ModalAdd"
import "./AdminPanel.scss"

const AdminPanel = () => {
    const dispatch = useDispatch()
    const postPanel = useSelector((state: any) => state.product.posts)
    const [idEdit, setIdEdit] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(false)
    const [oneData, setOneData] = useState<ICardApi>()

    const delte = (id: number) => {
        DeleteCardApi(id).then(() => {
            CardApi().then((e: ICardData) => {
                dispatch(addPost(e.data))
            })
        })
    }

    useEffect(() => {
        CardApi().then((e: ICardData) => {
            dispatch(addPost(e.data))
        })
    }, [])

    return (
        <div className="AdminPanel">
            <ModalAdd />
            <EditModal
                visible={visible}
                data={oneData}
                setVisible={(bol: boolean) => setVisible(bol)}
                id={idEdit}
            />
            {postPanel?.map((panel: ICardApi) => (
                <div className="AdminPanel__card">
                    <div className="AdminPanel__img">
                        <img src={panel.imgURL} />
                    </div>
                    <div className="AdminPanel__name">
                        <div className="Name">{panel.name}</div>
                        <div className="Carechteristics">
                            <p>Размер: {panel?.name}</p>
                            <p>Производитель: {panel?.manufacturer}</p>
                            <p>Размер: {panel.name}</p>
                            <p>Код: {panel?.code}</p>
                            <p>Бренд: {panel?.brand}</p>
                            <p>Размер: {panel?.size}</p>
                        </div>
                    </div>
                    <div className="AdminPanel__buttons">
                        <button onClick={() => delte(panel?.id || 0)}>
                            Удалить
                        </button>
                        <button
                            onClick={() => {
                                setVisible(true)
                                setIdEdit(panel?.id || 0)
                                setOneData(panel)
                                console.log(oneData);
                                
                            }}
                        >
                            Редактировать
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminPanel
