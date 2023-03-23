import { Children, FC, useState } from "react"
import './Toggle.scss'

const Toggle:FC<{children: React.ReactNode, nameBtn: string}> = ({children, nameBtn}) => {
    const [bol, setBol] = useState<boolean>(false)

    if (bol) {
        return (
            <div className="Toggle">
                <button onClick={() => setBol((p) => !p)}>{nameBtn}</button>
                <div>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="Toggle">
            <button onClick={() => setBol((p) => !p)}>{nameBtn}</button>
        </div>
    )
}

export default Toggle
