import { Store } from "../../models/store"

export interface ProductDetailsResponse {
  product: {
    name: string;
    price: number;
    favorite: boolean;
    stores: Store[];
    createdDate: Date;
    updatedDate: Date;
  }
}