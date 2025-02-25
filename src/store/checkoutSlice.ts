import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { MyordersData, OrderData, OrderDetails, OrderResponseData, OrderResponseItem } from "../globals/types/checkoutTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";


const initialState : OrderResponseData = {
    items : [],
    status : Status.LOADING,
    khaltiUrl : null,
    myOrders : [],
    orderDetails : []
}

const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {
        setItems(state:OrderResponseData,action:PayloadAction<OrderResponseItem>){
            state.items.push(action.payload)
        },
        setStatus(state:OrderResponseData,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setKhaltiUrl(state:OrderResponseData,action:PayloadAction<OrderResponseData['khaltiUrl']>) {
            state.khaltiUrl = action.payload
        },
        setMyOrders(state:OrderResponseData,action:PayloadAction<MyordersData[]>){
            state.myOrders = action.payload
        },
        setMyOrderDetails(state : OrderResponseData,action:PayloadAction<OrderDetails[]>){
            state.orderDetails = action.payload
        }
    }
})

export const { setItems,setStatus,setKhaltiUrl,setMyOrders,setMyOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;

export function orderItem(data:OrderData){
    return async function orderItemThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('/order',data)
            if(response.status === 200){
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                if(response.data.url){
                    dispatch(setKhaltiUrl(response.data.url))
                }else{
                    dispatch(setKhaltiUrl(null))
                }
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
        
    }
}

export function fetchMyOrders(){
    return async function fetchMyOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('order/customer');
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setMyOrders(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function fetchMyOrderDetails(id:string){
    return async function fetchMyOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('order/customer/'+id);
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setMyOrderDetails(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function cancelMyOrder(id:string){
    return async function cancelMyOrderThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.patch('order/customer/' + id);
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            setStatus(Status.ERROR)
            
        }
    }
}