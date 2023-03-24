import { Route, Routes, BrowserRouter, HashRouter } from "react-router-dom"
import Navigation from "../widgets/Navigation/Navigation"
import AdminPanel from "./AdminPanel/AdminPanel"
import Basket from "./Basket/Basket"
import Main from "./Catalog/Catalog"
import Product from "./Product/Product"

const Routing = () => {
    return (
        <HashRouter>
            <Navigation>
                <Routes>
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/adm" element={<AdminPanel />} />
                    <Route path="*" element={<h2>404</h2>} />
                </Routes>
            </Navigation>
        </HashRouter>
    )
}

export default Routing
