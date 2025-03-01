import axios from "axios";

const API = axios.create({
    // baseURL : "http://localhost:5000/",
    baseURL : import.meta.env.VITE_APP_SERVER_URL,
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
})

const APIAuthenticated = axios.create({
    baseURL : import.meta.env.VITE_APP_SERVER_URL,
    headers :{
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        // "Authorization" : localStorage.getItem('token')
        // "Authorization" : localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
        
        // "Authorization" : `${localStorage.getItem('token')}`
        "Authorization": `${localStorage.getItem(import.meta.env.VITE_CLIENT_STORAGE_KEY)}`,

    }

})

export {
    API,
    APIAuthenticated
}