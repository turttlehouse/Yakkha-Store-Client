import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductState } from "../globals/types/productTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import API from "../http";

 


const initialState: ProductState = {
    product :  [],
    status : Status.LOADING
}

//creating Slice
const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers :{
        setProduct : (state : ProductState, action : {payload : Product[]})=>{
            state.product = action.payload;

        },
        setStatus : (state : ProductState, action : {payload : Status})=>{
            state.status = action.payload;

        }
    }
})

//exporting actions
export const {setProduct, setStatus} = productSlice.actions;

//exporting reducer
export default productSlice.reducer;

//fetching products
export function fetchProducts(){
    return async function fetchProductsThunk(dispatch : AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await API.get('admin/products')
            if(response.status === 200){
                const {data} = response.data;
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setProduct(data));
            }else{
                dispatch(setStatus(Status.ERROR));
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            
        }
        
    }
}