import { Product } from "./Product";

export interface Orders {
    id: string;
    ClientName: string;
    products: [Product];
  }