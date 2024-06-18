export interface Orders {
    id: string;
    ClientName: string;
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
  