import { ICardApi } from "../../../shared/api/CardApi"

const initialState = {
    posts: [],
}

interface IAction {
    type: string
    posts: ICardApi[]
}

export const ADD_POST = "ADD_POST"

export const productReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ADD_POST:
            return { ...state, posts: [...action.posts] }
        default:
            return state
    }
}

export const addPost = (posts:ICardApi[])=>({type:  ADD_POST, posts: posts})
