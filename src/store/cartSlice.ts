import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../globals/types/cartTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

interface DeleteAction{
    productId : string
}

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
        },
        deleteItem(state:CartState,action:PayloadAction<DeleteAction>){
            // state.items = state.items.filter(item => item.Product._id !== action.payload.productId)
            const index = state.items.findIndex(item=>item?.Product?.id === action.payload?.productId)
            //-1 means not found case
            if(index !== -1){
                state.items.splice(index,1)
            }
        }
    }
})

//createSlice trigger vayepaxi obj return garxa

export const {setItems,setStatus,deleteItem} = cartSlice.actions


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

export function deleteCartItem(productId:string){
    return async function deleteCartItemThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`customer/cart/${productId}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                //object ko form ma expect garxa reducer le so object pass gareko
                dispatch(deleteItem({productId}))
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
        
    }
}