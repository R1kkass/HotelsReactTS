import "./Catalog.scss"

import rows from "../../shared/UI/SVG/TypeRender/Rows.svg"
import block from "../../shared/UI/SVG/TypeRender/Block.svg"
import LeftBlockCatalog from "../../widgets/LeftBlockCatalog/LeftBlockCatalog"
import Card from "../../shared/UI/Card/Card"
import PostCard from "../../features/PostCard/PostCard"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"

const Catalog = () => {
    return (
        <div className="Catalog">
            <div className="Catalog__broadCrumbs">
                <Breadcrumbs arr={[{name:'Каталог', link: '/'}]}/>
            </div>
            <div className="Catalog__secondLine">
                <div>
                    <h1>Косметика и гигиена</h1>
                </div>
                <div className="Catalog__sort">
                    <div>
                        <p>Сортировка: Название</p>
                    </div>
                    <div className="Catalog__toggle">
                        <button>
                            <img src={rows} />
                        </button>
                        <button>
                            <img src={block} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="Catalog__thirdLine">
                <div>
                    <p>Уход за телом</p>
                </div>
                <div>
                    <p>Уход за телом</p>
                </div>
                <div>
                    <p>Уход за телом</p>
                </div>
            </div>
            <div className="Catalog__main">
                <div className="Catalog__sortParams">
                    <LeftBlockCatalog/>
                </div>
                <div className="Catalog__product">
                    <PostCard/>
                </div>
            </div>
        </div>
    )
}

export default Catalog
