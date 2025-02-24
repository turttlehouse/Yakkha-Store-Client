import React from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  ItemDetails,
  OrderData,
  PaymentMethod,
} from "../../globals/types/checkoutTypes";
import { orderItem } from "../../store/checkoutSlice";
import { Status } from "../../globals/types/types";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {

  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  const dipatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.carts);

  const {khaltiUrl,status} = useAppSelector((state)=>state.orders)

  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.COD);

  const [data, setData] = React.useState<OrderData>({
    phoneNumber: "",
    shippingAddress: "",
    totalAmount: 0,
    paymentDetails: {
      paymentMethod: PaymentMethod.COD,
    },
    items: [],
  });

  const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)

    //button toggle garna
    setPaymentMethod(e.target.value as PaymentMethod)

    setData({
      ...data,
      paymentDetails: {
        paymentMethod: e.target.value as PaymentMethod,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      //search the name in the data object and set the value
      [name]: value,
    });
  };

  //   console.log(data);
  let subTotal = items?.reduce(
    (total, item) => item?.Product?.productPrice * item?.quantity + total,
    0
  );

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemDetails: ItemDetails[] = items?.map((item) => {
      return {
        quantity: item?.quantity,
        productId: item?.Product?.id,
      };
    });

    const orderData: OrderData = {
      ...data,
      items: itemDetails,
      totalAmount: subTotal,
    };

    // console.log(orderData);
    await dipatch(orderItem(orderData));

    if(khaltiUrl){
      window.location.href = khaltiUrl;
    }
  };

  React.useEffect(()=>{
    if(status === Status.SUCCESS){
      alert('Order Placed Successfully');
      navigate('/');
    }

  },[status,dipatch])

  return (
    <>
      <Navbar />

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Left Div cart product and payment methods */}
        <div className="px-4 pt-4">
          {/* Cart Products */}
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>

          <div className="mt-1 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items?.length > 0 &&
              items.map((item) => {
                return (
                  <div
                    key={item?.Product.id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      // src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                      src={item?.Product?.productImageUrl ? `${SERVER_URL}${item.Product.productImageUrl}` : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                      alt="product image"
                    />

                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item?.Product?.productName}
                      </span>
                      <span className="float-right text-gray-400">
                        Qty : {item?.quantity}
                      </span>
                      <p className="text-lg font-bold">
                        Rs.{item?.Product?.productPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Payment Methods */}
          <p className="mt-8 text-lg font-medium">Payment Methods</p>

          {/* Form 1 */}
          <form className="mt-5 grid gap-6">
            {/* cash on Delivery */}
            <div className="relative">
              {/* VALUE attribute rakhne kina vane kei kura change vayo vane yo value pass vairahunxa mathi */}
              <input
                onChange={handlePaymentMethod}
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                value={PaymentMethod.COD}
              />

              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>

              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />

                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    COD(Cash On Delivery)
                  </span>
                  {/* <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p> */}
                </div>
              </label>
            </div>

            {/* Khalti */}
            <div className="relative">
              <input
                onChange={handlePaymentMethod}
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                value={PaymentMethod.KHALTI}
              />

              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>

              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />

                <div className="ml-5">
                  <span className="mt-2 font-semibold">Online(Khalti)</span>
                  {/* <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p> */}
                </div>
              </label>
            </div>
          </form>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Right Div Customer Details ,payment Details */}
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>

            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>

            <div className="">
              {/*  Email */}

              {/* <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div> */}

              {/* PhoneNumber */}
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Phone Number
              </label>

              <div className="relative">
                <input
                  onChange={handleChange}
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your phoneNumber"
                />
              </div>

              {/* Shipping Address */}
              <label
                htmlFor="ShippingAddress"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Shipping Address
              </label>

              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="ShippingAddress"
                    name="shippingAddress"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />

                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              {/* subTotal & shipping  */}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">Rs.{subTotal}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">Rs.100</p>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  Rs.{subTotal + 100}
                </p>
              </div>
            </div>

            {paymentMethod === PaymentMethod.KHALTI ? (
              <button className="mt-4 mb-8 w-full rounded-md bg-purple-900 px-6 py-3 font-medium text-white">
                Pay with Khalti
              </button>
            ) : (
              <button
                type="submit"
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
