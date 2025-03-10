import { Product } from "./productTypes";
import { Status } from "./types";

export enum PaymentMethod {
  COD = "cod",
  KHALTI = "khalti",
}

export interface ItemDetails {
  productId: string;
  quantity: number;
}

export interface OrderData {
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: Payment;
  // paymentDetails : {
  //     paymentMethod : PaymentMethod;
  // },
  items: ItemDetails[];
}

export interface OrderResponseItem extends ItemDetails {
  orderId: string;
}

export interface OrderResponseData {
  items: OrderResponseItem[];
  status: Status;
  khaltiUrl: string | null;
  myOrders: MyordersData[];

  orderDetails : OrderDetails[];  
}

//order types

//order status types

export enum OrderStatus {
  Pending = "pending",
  Delivered = "delivered",
  Ontheway = "ontheway",
  Cancel = "cancelled",
  Preparation = "preparation",
  All = "all"
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
  Pending = "pending",
}

interface Payment {
  paymentMethod: PaymentMethod;
}

//order payment types
interface OrderPaymentData extends Payment {
  paymentStatus: PaymentStatus;
}

//fetching orders types

export interface MyordersData {
  id: string;
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  paymentId: string;
  // userId: string;
  userId : UserData;
  Payment: OrderPaymentData;

  // "Payment": {
  //     "id": "e42cb89b-b85e-40a2-aa51-6a794fefe27f",
  //     "paymentMethod": "cod",
  //     "paymentStatus": "unpaid",
  //     "pidx": null,
  //     "createdAt": "2025-01-31T15:37:29.000Z",
  //     "updatedAt": "2025-01-31T15:37:29.000Z"
  // }
}


//orderDetails types
interface UserData{
  username : string;
  email : string;
}


export interface OrderDetails{
  id : string;
  quantity : number;
  orderId : string;
  Product : Product;
  Order : MyordersData;

}
