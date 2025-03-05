import React from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    component : React.ComponentType<any>;
    isAuthenticated : boolean;
    [key:string]: any;

}

const ProtectedRoute : React.FC<ProtectedRouteProps> = ({component:Component,isAuthenticated,...rest}) => {
  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default ProtectedRoute












// Type '{ render: (props: any) => Element; }' is not assignable to type 'IntrinsicAttributes & RouteProps'. Property 'render' does not exist on type 'IntrinsicAttributes & RouteProps'.
// The problem is that the Route component from react-router-dom no longer supports the render prop. You should use the element prop instead.


//     return (
//     <Route
//      {...rest}
//      element={
//         isAuthenticated ? (
//             <Component />
//         ) : (
//             <Navigate to="/login" />
//         )
//      }
//      />

//   )
