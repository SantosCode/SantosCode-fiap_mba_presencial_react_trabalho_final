import { Store } from './store'

export interface ProductDetails {
  product: {
    name: string;
    price: number;
    isFavorite: boolean;
    stores: Store[];
    createdDate: Date;
    updatedDate: Date;
  }
}