import { Product } from "./Product";

export interface Orders {
    id: string;
    ClientName: string;
    products: [Product];
    total: number;
    customerId: string;
    orderDate: string; 
    status: string; 
    orderItems: OrderItem[];
  }

  export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }

