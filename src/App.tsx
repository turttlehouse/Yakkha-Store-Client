import { Provider } from "react-redux";
import store from "./store/store";
import { io } from "socket.io-client";
import AllRoutes from "./routes/AllRoutes";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL

export const socket = io(serverUrl,{
  auth :{
    token : localStorage.getItem('client_auth_token')
  }
})

const App = () => {
  return (
    <Provider store={store}>
      <AllRoutes /> 
    </Provider>
  );
};

export default App;
