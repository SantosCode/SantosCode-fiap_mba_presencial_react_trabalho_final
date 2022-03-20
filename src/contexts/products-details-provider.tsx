import { createContext, useContext } from 'react';
import { ProductDetails } from '../models/product-details';
import { ProductDetailsRequest } from '../services/products/product-details-request';

export interface ProductsDetailsContextType {
  productDetails?: ProductDetails;
  setProductDetails: (productDetails?: ProductDetails) => void;
  fetchProductDetails: (requestData: ProductDetailsRequest) => void;
}

export const ProductsDetailsContext = createContext<ProductsDetailsContextType>({
  setProductDetails: async () => { },
  fetchProductDetails: async () => { },
})

export const useProductDetailsProvider = (): ProductsDetailsContextType =>
  useContext(ProductsDetailsContext)