import {Store} from "./store";

interface Products {
  name: string;
  price: number;
  isFavorite: boolean;
  stores: Store[];
  createdDate: Date;
  updatedDate: Date;
  id: string;
}

export interface FavoriteProducts {
  products: Products[];
}