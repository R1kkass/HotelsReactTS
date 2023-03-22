import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CheckBox from "../../shared/UI/CheckBox/CheckBox"
import MyInput from "../../shared/UI/Input/MyInput"
import "./LeftBlockCatalog.scss"
import deletes from '../../shared/UI/SVG/Delete/Delete.svg'

const LeftBlockCatalog = () => {
    return (
        <div className="LeftBlockCatalog">
            <div className="LeftBlockCatalog__text">
                <h4>ПОДБОР ПО ПАРАМЕТРАМ</h4>
            </div>
            <div className="LeftBlockCatalog__price">
                <p>Цена</p>
            </div>
            <div className="LeftBlockCatalog__counter">
                <input defaultValue={1} className="PriceCounter" />
                <p> - </p>
                <input defaultValue={10000} className="PriceCounter" />
            </div>
            <div className="LeftBlockCatalog__text">
                <h4>Производитель</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput />
                <CheckBox text="Grifon" count="56" />
                <CheckBox text="Boyscout" count="66" />
                <CheckBox text="Paclan" count="166" />
                <CheckBox text="Булгари Грин" count="21" />
                <p className="more">Показать всё</p>
            </div>
            <div className="LeftBlockCatalog__text">
                <h4>Бренд</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput />
                <CheckBox text="Nivea" count="56" />
                <CheckBox text="GRIFON" count="66" />
                <CheckBox text="Домашний сундук" count="166" />
                <CheckBox text="HELP" count="21" />
                <p className="more">Показать всё</p>
                <div className="InputButton">
                    <MyButton>Показать</MyButton>
                    <MyButton><img src={deletes}/></MyButton>
                </div>
            </div>
        </div>
    )
}

export default LeftBlockCatalog
