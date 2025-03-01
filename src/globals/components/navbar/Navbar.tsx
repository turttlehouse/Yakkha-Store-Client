import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import React from "react";
import { fetchCartItems } from "../../../store/cartSlice";

const Navbar = () => {
  const navigate  = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {items} = useAppSelector((state)=>state.carts)

  React.useEffect(() => {
    const token = localStorage.getItem((import.meta.env.VITE_CLIENT_STORAGE_KEY) as string);
    setIsLoggedIn(!!token || !!user.token);

    dispatch(fetchCartItems());

    
  }, [user.token]);

  const handleLogout = ()=>{
    localStorage.removeItem(import.meta.env.VITE_CLIENT_STORAGE_KEY);
    setIsLoggedIn(false);
    navigate('/login')
  }

  return (
    <header
      id="page-header"
      className="relative flex flex-none items-center py-8 bg-blue-300"
    >
      <div className="container mx-auto flex flex-col gap-4 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-8 xl:max-w-7xl">
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          >
          <img src="/brand-logo.png" className="w-10 h-10" />     
               
          <span>
  <span className="text-blue-500">Yakkha</span>
  <span className="text-white"> Store</span>
</span>          </Link>
        </div>
        <nav className="space-x-3 md:space-x-6">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-black "
              >
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-black "
              >
                <span>Register</span>
              </Link>
            </>
          ) : (
            <>
            <Link
              to="/cart"
              className="text-sm font-semibold text-black hover:text-blue-600  dark:hover:text-blue-400"
            >
              <span>Cart <sup>{items?.length >0 && items?.length}</sup></span>
            </Link>
            <Link
              to="#"
              onClick={handleLogout}
              className="text-sm font-semibold text-black hover:text-blue-600  dark:hover:text-blue-400"
            >
              <span>Logout</span>
            </Link>
            </>

          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
