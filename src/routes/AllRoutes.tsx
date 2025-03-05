import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home';
import Register from '../pages/auth/register/Register';
import Login from '../pages/auth/login/Login';
import SingleProduct from '../pages/product/SingleProduct';
import Checkout from '../pages/checkout/Checkout';
import Cart from '../pages/cart/Cart';
import Orders from '../pages/orders/myOrders/Orders';
import MyOrdersDetails from '../pages/orders/myOrders/MyOrderDetails';
import ProtectedRoute from './ProtectedRoute';


const AllRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

    React.useEffect(()=>{
        const token = localStorage.getItem('client_auth_token');
        // const token = localStorage.getItem(import.meta.env.VITE_CLIENT_STORAGE_KEY as string);
        //if token exist then set isAuthenticated to true else false
        setIsAuthenticated(!!token);

    },[])

    if (isAuthenticated === null) {
        return <div className='bg-red-500'>Loading...</div>; 
      }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path = "/login" element = {<Login/>}/>

      {/* Protected Routes */}

      <Route path="/product/:id" element= {<SingleProduct/>}/>
      <Route path="/cart" element= {<ProtectedRoute component={Cart} isAuthenticated={isAuthenticated}/>}/>
      <Route path = "/checkout" element = {<ProtectedRoute component={Checkout} isAuthenticated={isAuthenticated}/>} />
      <Route path = "/myOrders" element = {<ProtectedRoute component={Orders} isAuthenticated={isAuthenticated} />} />
      <Route path = "/myOrders/:id" element = {<ProtectedRoute component={MyOrdersDetails} isAuthenticated={isAuthenticated} />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </BrowserRouter>
  )
}

export default AllRoutes
