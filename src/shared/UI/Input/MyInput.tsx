import MyButton from "../Buttons/MyButton/MyButton"
import search from "../SVG/Search/Search.svg"
import './MyInput.scss'

const MyInput = () => {
    return (
        <div className="MyInput">
            <input placeholder="Поиск..." />
            <MyButton>
                <img src={search} />
            </MyButton>
        </div>
    )
}

export default MyInput
