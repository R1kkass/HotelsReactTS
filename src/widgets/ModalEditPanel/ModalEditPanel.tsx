import { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FilterApi, FilterApiPut, IArray, IFilterApi, IFilterApiData } from "../../shared/api/FilterApi"
import Modal from "../../shared/UI/Modal/Modal"

interface IModalEditPanel{
    visible: boolean,
    setVisible: (bol: boolean)=>void,
    post?:IFilterApi
    callback: ()=>void
}

const ModalEditPanel: FC<IModalEditPanel> = ({ callback, post,visible, setVisible }) => {
    const [type, setType] = useState<IArray[] >(post?.array || [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFilterApi>()

    const onSubmit = (data:IFilterApi)=>{
        console.log(post);
        let dat = {...data, array: type}
        FilterApiPut(Number(post?.id) || 0, dat).then((e)=>{
            callback()
        })
    }
    const refType = useRef<HTMLInputElement>(null)

    const addType = ()=>{
        
        if(refType?.current?.value){
            setType([...type, {name: refType.current.value}])
        }
    }

    useEffect(()=>{
        setType(post?.array || [])
    }, [post])

    const delte = (id: number) => {
        setType(
            type?.filter((key, i) => {
                return i != id
            })
        )
    }

    return (
        <Modal visible={visible} callback={() => setVisible(false)}>
            <div className="ModalAdd__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>
                            Название
                            <input
                                defaultValue={post?.title}
                                placeholder="Название"
                                {...register("title", {
                                    required: true,
                                    maxLength: 30,
                                })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Название
                            <input
                                ref={refType}
                                placeholder="Тип"
                            />
                        </label>
                        <div onClick={() => addType()}>Добавить в тип</div>
                        <div>
                            {type?.map((key, i)=>(
                                <div key={key.name+i}>
                                    <p>{key.name}</p>
                                    <button onClick={()=>delte(i)}>Удалить</button>
                                </div>
                            ))}
                        </div>
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
    )
}

export default ModalEditPanel
