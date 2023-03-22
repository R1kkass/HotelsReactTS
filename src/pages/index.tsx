import { Route, Routes, BrowserRouter } from "react-router-dom"
import Navigation from "../widgets/Navigation/Navigation"
import Basket from "./Basket/Basket"
import Main from "./Catalog/Catalog"
import Product from "./Product/Product"

const Routing = () => {
    return (
        <BrowserRouter>
            <Navigation>
                <Routes>
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/product/:id" element={<Product />} />

                    <Route path="*" element={<h2>404</h2>} />
                </Routes>
            </Navigation>
        </BrowserRouter>
    )
}

export default Routing
