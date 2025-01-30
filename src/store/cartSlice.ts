import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../globals/types/cartTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";


const initialState : CartState = {
    items : [],
    status : Status.LOADING
}

const cartSlice = createSlice({
    name : "cart",
    //js ma key ra value same xa vane euta lekhda vayo
    initialState,
    reducers : {
        setItems(state:CartState,action:PayloadAction<CartItem[]>){
            // console.log(action.payload);
            state.items = action.payload
        },
        setStatus(state:CartState,action: PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

//createSlice trigger vayepaxi obj return garxa

export const {setItems,setStatus} = cartSlice.actions


export default cartSlice.reducer
// console.log(cartSlice)

export function addToCart(productId:string){
    return async function addToCartThunk(dispatch: AppDispatch ){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('customer/cart',{
                productId,
                quantity : 1
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }

    }
}

export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch: AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('customer/cart')
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}
