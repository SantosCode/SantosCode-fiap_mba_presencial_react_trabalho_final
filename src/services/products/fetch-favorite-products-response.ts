interface StoresResponse {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  _id: string;
}

interface ProductResponse {
  _id: string;
  name: string;
  price: number;
  stores: StoresResponse[];
  createdDate: string;
  updatedDate: string;
}

export interface FetchFavoriteProductsResponse {
  products: ProductResponse[];
}