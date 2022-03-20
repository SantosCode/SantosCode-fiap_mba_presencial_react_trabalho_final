interface ProductsResponse {
  _id: string;
  name: string;
  price: number;
  favorite: boolean;
}

export interface FetchProductsListResponse {
  totalItems: number;
  page: number;
  perPage: number;
  products: ProductsResponse[]
}
