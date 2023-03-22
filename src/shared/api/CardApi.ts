import axios from 'axios'

export interface ICardApi{
    id: number
    imgURL: string
    size: string
    brand: string
    code: string
    manufacturer: string
    price: number
    name: string
    count?: number
}

export interface ICardData{
    data: ICardApi[]
}

export const CardApi = async()=>{
    let res:ICardData[] = await axios.get('https://641757421cbdda1fa1577617.mockapi.io/cx/Market') 
    return res
}