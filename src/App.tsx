import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import Routing from "./pages"
import "./app/Styles/GlobalStyles.scss"
import { ICardApi } from "./shared/api/CardApi"
import Breadcrumbs from "./features/BreadCrumbs/BreadCrumbs"
import { Provider } from "react-redux/es/exports"
import { store } from "./app/Redux/Store/Index"

function App() {

    return (
        <Provider store={store}>
                <Routing />
        </Provider>
    )
}

export default App
