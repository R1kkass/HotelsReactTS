import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import Routing from "./pages"
import "./app/Styles/GlobalStyles.scss"
import { ContextPost } from "./app/Context/ContextPost"
import { ICardApi } from "./shared/api/CardApi"
import Breadcrumbs from "./features/BreadCrumbs/BreadCrumbs"
import { Provider } from "react-redux/es/exports"
import { store } from "./entities/Redux/Store/Index"

function App() {
    const [posts, setPosts] = useState<ICardApi[]>([])
    const [count, setCount] = useState<number>(0)
    const fetchPost = (post: ICardApi[]) => {
        setPosts(post)
    }
    const [basket, setBasket] = useState<ICardApi[]>([])

    useEffect(() => {
        setCount(JSON.parse(localStorage.getItem("basket") || "[]").length)
    }, [])

    const basketSet = (e: ICardApi[]) => {
        setBasket(e)
        localStorage.setItem("basket", JSON.stringify(e))
    }

    const addBasket = (post: any) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let posts = post
        posts.count = 1
        basket.push(posts)
        setCount(basket.length)
        localStorage.setItem("basket", JSON.stringify(basket))
    }

    const deletePost = (id: number) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = basket.filter((key: ICardApi) => {
            return key.id != id
        })
        localStorage.setItem("basket", JSON.stringify(res))
        setCount(res.length)
    }

    return (
        <Provider store={store}>
            <ContextPost.Provider
                value={{
                    basketSet,
                    basket,
                    deletePost,
                    count,
                    posts,
                    fetchPost,
                    addBasket,
                }}
            >
                <Routing />
            </ContextPost.Provider>
        </Provider>
    )
}

export default App
