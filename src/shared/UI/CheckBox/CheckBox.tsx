import { FC, useRef } from "react"
import './CheckBox.scss'

interface ICheckbox{
    text: string
    count: string
}

const CheckBox:FC<ICheckbox> = ({text, count}) => {
    const refCheck = useRef<HTMLInputElement>(null)

    return (
        <div className="CheckBox">
            <label>
                <input ref={refCheck} type="checkbox" />
                <p className="CheckBox__text">{text}</p>
                <p className="CheckBox__count">({count})</p>
            </label>
        </div>
    )
}

export default CheckBox
