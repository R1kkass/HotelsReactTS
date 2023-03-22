import { createContext } from "react";
import { ICardApi } from "../../shared/api/CardApi";

interface IContext{
    posts: ICardApi[],
    fetchPost: (post:ICardApi[])=>void,
    addBasket: (post: ICardApi)=>void,
    count: number
    deletePost: (id: number)=>void
    basket: ICardApi[]
    basketSet: (post:ICardApi[])=>void
}

export const ContextPost = createContext<IContext>({
    posts: [],
    fetchPost: ()=>{},
    addBasket: ()=>{},
    count: JSON.parse(localStorage.getItem('basket') || '[]').length,
    deletePost: ()=>{},
    basket: [],
    basketSet: ()=>{}
})