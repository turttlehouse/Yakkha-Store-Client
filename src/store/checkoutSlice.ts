import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { MyordersData, OrderData, OrderDetails, OrderResponseData, OrderResponseItem, OrderStatus, PaymentStatus } from "../globals/types/checkoutTypes";
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
        },
        updateOrderStatus(state : OrderResponseData,action:PayloadAction<{status:OrderStatus,orderId:string}>){

            const status = action.payload.status
            // console.log(status)
            const orderId = action.payload.orderId
            // console.log(orderId)

            const updatedOrder = state.myOrders.map(order=>order.id === orderId ? {...order,orderStatus : status} : order)
            state.myOrders = updatedOrder
            // console.log(state.myOrders)
        },
        updatePaymentStatus(state: OrderResponseData,action : PayloadAction<{status:PaymentStatus,orderId:string}>){
            const newPaymentstatus = action.payload.status
            console.log(status)
            const orderId = action.payload.orderId
            console.log(orderId)

            console.log(state.myOrders)

            // [
            //     {
            //       id: '269f8b24-d01e-4386-b04c-4c66d9941513',
            //       phoneNumber: '9712345678',
            //       shippingAddress: 'pokhara',
            //       totalAmount: 1700,
            //       orderStatus: 'delivered',
            //       createdAt: '2025-02-24T02:58:13.000Z',
            //       updatedAt: '2025-03-05T00:30:36.000Z',
            //       paymentId: '2b04629b-0b95-4889-9cd5-52c708f51b53',
            //       userId: '6bacdcb8-6a22-4acb-81bd-c3a6c1b504d4',
            //       Payment: {
            //         id: '2b04629b-0b95-4889-9cd5-52c708f51b53',
            //         paymentMethod: 'cod',
            //         paymentStatus: 'unpaid',
            //         pidx: null,
            //         createdAt: '2025-02-24T02:58:13.000Z',
            //         updatedAt: '2025-03-05T00:44:53.000Z'
            //       }
            //     }
            //   ]
            
            const updatedOrder = state.myOrders.map(order=>order.id === orderId ? {...order,Payment : {...order.Payment,paymentStatus : newPaymentstatus}} : order)
            state.myOrders = updatedOrder
        }
    }
})

export const { setItems,setStatus,setKhaltiUrl,setMyOrders,setMyOrderDetails,updateOrderStatus,updatePaymentStatus } = orderSlice.actions;

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

export function updateOrderStatusOnStore(data:any){
    return async function updateOrderStatusOnStoreThunk(dispatch:AppDispatch){
        dispatch(updateOrderStatus(data))
    }
}

export function updatePaymentStatusOnStore(data:any){
    return async function updatePaymentStatusOnStoreThunk(dispatch:AppDispatch){
        dispatch(updatePaymentStatus(data))
    }
}