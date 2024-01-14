import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails{
    fullName: string;
    fullAdress: string;
    contactNumber: string;
    alternateContactNumber: string;
    orderProductQuantityList: OrderQuantity[];
}