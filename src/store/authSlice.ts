import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'

interface RegisterData{
    username : string,
    email : string,
    password : string
}

interface LoginData{
    email : string,
    password : string
}

interface User{
    username : string,
    email : string,
    password : string,
    token : string,
    status : string
}

interface AuthState{
    user : User,
    status : string
}

const initialState : AuthState = {
    user : {} as User,
    status : "" //network request status 
}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {
        setUser(state:AuthState,action:PayloadAction<User>){
            state.user = action.payload
        },
        setStatus(state:AuthState,action : PayloadAction<string>){
            state.status = action.payload
        }
    }
     
})

export const {setUser,setStatus} = authSlice.actions
export default authSlice.reducer

export function register(data:RegisterData){
    return async function registerThunk(dispatch: any){
        dispatch(setStatus("loading"))
        try {
            const response = await axios.post("http://localhost:5000/register",data);
            if(response.status === 201){ 
                dispatch(setStatus("success"))
            }
            else{
                dispatch(setStatus("error"))
                
            }
            
        } catch (error) {
            dispatch(setStatus("error"))
        }
    }
}


export function login(data : LoginData){
    return async function loginThunk(dispatch:any){
        dispatch(setStatus("loading"))
        try {
            const response = await axios.post("http://localhost:5000/login",data);
            if(response.status === 200){
                dispatch(setUser(response.data))
                dispatch(setStatus("success"))
            }
            else{
                dispatch(setStatus("error"))
            }
        } catch (error) {
            dispatch(setStatus("error"))
        }
    }
}