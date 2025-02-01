import { Status } from "./types";

export enum PaymentMethod {
    COD = 'cod',
    KHALTI = 'khalti'
}

export interface ItemDetails{
    productId : string;
    quantity : number;
}

export interface OrderData{
    phoneNumber : string;
    shippingAddress : string;
    totalAmount : number;
    paymentDetails : {
        paymentMethod : PaymentMethod;
    },
    items : ItemDetails[];
}

export interface OrderResponseItem extends ItemDetails{ 
    orderId : string;
}

export interface OrderResponseData{
    items : OrderResponseItem[];
    status : Status;
    khaltiUrl : string | null;
}