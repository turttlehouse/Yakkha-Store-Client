import React from "react";
import { Product } from "../../types/productTypes";
import { Link } from "react-router-dom";

interface CardProps {
  data: Product;
  key: string;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <>
    <Link to={`/product/${data.id}`}>
      <div className="max-w-2xl mx-auto mt-4">
        <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="rounded-t-lg p-8"
              src="data:image/jpeg;base64,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"
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                {data?.productName}
              </h3>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Rs.{data?.productPrice}
              </span>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};

export default Card;
