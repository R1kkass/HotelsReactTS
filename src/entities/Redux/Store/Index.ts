import { combineReducers, createStore } from "redux"
import { basketReducer } from "./basket"
import { productReducer } from "./product"

const rootReducers = combineReducers({
    basket: basketReducer,
    product: productReducer
})

export const store = createStore(rootReducers)
