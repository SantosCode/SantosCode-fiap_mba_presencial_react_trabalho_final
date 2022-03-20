import { Product } from "./product"

export interface ProductsList {
  totalItems: number;
  page: number;
  perPage: number;
  products: Product[]
}