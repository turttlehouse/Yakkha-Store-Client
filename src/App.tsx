import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import SingleProduct from "./pages/product/SingleProduct";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/myOrders/Orders";
import MyOrderDetails from "./pages/orders/myOrders/MyOrderDetails";
import { io } from "socket.io-client";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL

export const socket = io(serverUrl,{
  auth :{
    token : localStorage.getItem('client_auth_token')
  }
})

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path="/product/:id" element= {<SingleProduct/>}/>
          <Route path="/cart" element= {<Cart/>}/>
          <Route path = "/checkout" element = {<Checkout />} />
          <Route path = "/myOrders" element = {<Orders />} />
          <Route path = "/myOrders/:id" element = {<MyOrderDetails />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
