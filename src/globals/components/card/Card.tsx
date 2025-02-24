import React from "react";
import { Product } from "../../types/productTypes";
import { Link } from "react-router-dom";

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  return (
    <Link to={`/product/${data.id}`} className="block max-w-sm mx-auto mt-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 dark:bg-gray-800">
        <img
          className="w-full h-56 object-cover"
          src={data?.productImageUrl ? `${SERVER_URL}${data.productImageUrl}` : "https://via.placeholder.com/300"}
          alt={data?.productName || "Product Image"}
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {data?.productName}
          </h3>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">5.0</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Rs. {data?.productPrice}
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;


// import React from "react";
// import { Product } from "../../types/productTypes";
// import { Link } from "react-router-dom";

// interface CardProps {
//   data: Product;
//   key: string;
// }

// const Card: React.FC<CardProps> = ({ data }) => {
//   const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

//   // console.log(data?.productImageUrl)

//   return (
//     <>
//     <Link to={`/product/${data.id}`}>
//       <div className="max-w-2xl mx-auto mt-4">
//         <div className="bg-white shadow-md  w-[300px] h-[400px] rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
//           {/* <a href="#"> */}
//             <img
//               className="rounded-t-lg p-8 object-cover"
//               // src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
//               // src = {`${SERVER_URL}${data?.productImageUrl}` || "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
//               src={data?.productImageUrl ? `${SERVER_URL}${data.productImageUrl}` : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}

//               alt="product image"
//             />
//           {/* </a> */}
//           <div className="px-5 pb-5 flex flex-col flex-grow justify-between">
//               <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
//                 {data?.productName}
//               </h3>
//             <div className="flex items-center mt-2.5 mb-5">
//               <svg
//                 className="w-5 h-5 text-yellow-300"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//               <svg
//                 className="w-5 h-5 text-yellow-300"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//               <svg
//                 className="w-5 h-5 text-yellow-300"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//               <svg
//                 className="w-5 h-5 text-yellow-300"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//               <svg
//                 className="w-5 h-5 text-yellow-300"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//               <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
//                 5.0
//               </span>
//             </div>
//             <div className="flex items-center justify-between gap-4">
//               <span className="text-xl font-bold text-gray-900 dark:text-white">
//                 Rs.{data?.productPrice}
//               </span>
//               <button
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//     </>
//   );
// };

// export default Card;

