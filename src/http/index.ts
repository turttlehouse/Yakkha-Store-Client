import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/",
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
})

const APIAuthenticated = axios.create({
    baseURL : "http://localhost:5000/",
    headers :{
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        // "Authorization" : localStorage.getItem('token')
        // "Authorization" : localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
        "Authorization" : `${localStorage.getItem('token')}`
    }

})

export {
    API,
    APIAuthenticated
}