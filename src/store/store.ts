import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import orderSlice from './checkoutSlice'


const store = configureStore({
    reducer : {
        auth : authSlice,
        products : productSlice,
        carts : cartSlice,
        orders : orderSlice
    }
})

export default store


// Infer the `RootState` and `AppDispatch` types from the store itself
//typeof store.dispatch is used to infer the type of store.dispatch. This means that AppDispatch will have the same type as store.dispatch without you needing to manually specify what that type is. This is useful because it ensures that AppDispatch will always be in sync with the actual type of store.dispatch, even if it changes in the future.
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>