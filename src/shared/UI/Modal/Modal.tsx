import { FC, useState } from "react"
import MyButton from "../Buttons/MyButton/MyButton"
import './Modal.scss'

const Modal: FC<{
    children: React.ReactNode
    visible: boolean
    callback: () => void
}> = ({ visible, children, callback }) => {
    return (
        <>
            {visible ? (
                <div className="Modal" onClick={callback}>
                    <div className="Modal__content" onClick={(e:React.MouseEvent)=>e.stopPropagation()}>{children}</div>
                </div>
            ) : (
                ""
            )}
        </>
    )
}

export default Modal
