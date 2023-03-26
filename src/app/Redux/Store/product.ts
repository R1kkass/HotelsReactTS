import { json } from "react-router-dom"
import { ICardApi } from "../../../shared/api/CardApi"

const initialState = {
    posts: [],
}

interface IAction {
    type: string
    posts: ICardApi[]
    url?: any
}

export const ADD_POST = "ADD_POST"
export const FILTER_POST = "FILTER_POST"

export const productReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ADD_POST:
            return { ...state, posts: [...action.posts] }
        case FILTER_POST:
            const url = action.url
            let res:ICardApi[]=JSON.parse(localStorage.getItem('products') || '[]')
            
            

            if(url.get("priceMin") && url.get("priceMax")){

                res = res.filter((prod) => {
                    return (
                        prod.price >= Number(url.get("priceMin")) &&
                        prod.price <= Number(url.get("priceMax"))
                    )
                })
            }

            if(url.get('param')){
                res = res.filter((prod: any)=>{
                    return prod?.type.includes(url.get('param'))
                })
            }

            if(url.get('sort')){
                switch (url.get('sort')) {
                    case "По убыванию цены":
                        res = res.sort((a: ICardApi, b: ICardApi) => {
                            return (Number(b.price) || 0) - (Number(a.price) || 0)
                        })
                        break
                    case "По возрастанию цены":
                        res = res.sort((a: ICardApi, b: ICardApi) => {
                            return (Number(a.price) || 0) - (Number(b.price) || 0)
                        })
                        break
                    case "По навзванию (А-Я)":
                        res = res.sort((a: ICardApi, b: ICardApi) => {
                            return a?.name?.localeCompare(b?.name)
                        })
                        break
                    case "По названию (Я-А)":
                        res = res.sort((a: ICardApi, b: ICardApi) => {
                            return b?.name?.localeCompare(a?.name)
                        })
                        break
                }
            }

            if(url.get('manufParam') && JSON.parse(url.get('manufParam') || '[]').length){
                let a;
                let b:any = new Set([])
                for(let i=0; i<res.length; i++){
                    
                     a = JSON.parse(url.get('manufParam')).filter((key:string)=>{
                        if(key==res[i].manufacturer){
                            b.add(res[i])
                        }
                        return key=res[i].manufacturer
                    })

                }
                res.length=0
                res=[...b]
            }

            if(url.get('brandParam') && JSON.parse(url.get('brandParam') || '[]').length){
                let a;
                let b:any = new Set([])
                for(let i=0; i<res.length; i++){
                    
                     a = JSON.parse(url.get('brandParam')).filter((key:string)=>{
                        if(key==res[i].brand){
                            b.add(res[i])
                        }
                        return key=res[i].brand
                    })

                }
                res.length=0
                res=[...b]
            }

            return { ...state, posts: [...res] }
        default:
            return state
    }
}

export const addPost = (posts: ICardApi[]) => ({ type: ADD_POST, posts: posts })
export const filterPost = (url: any) => ({ type:FILTER_POST, url: url })