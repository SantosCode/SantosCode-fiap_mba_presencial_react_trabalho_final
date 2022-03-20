import { createContext, useContext } from 'react';
import { FavoriteProducts } from "../models/favorite-products";

export interface FavoriteProductsType {
  favoriteProducts?: FavoriteProducts;
  isFetching: boolean;
}

export const FavoriteProductsContext = createContext<FavoriteProductsType>({
  isFetching: false
})

export const useFavoriteProductsProvider = (): FavoriteProductsType =>
  useContext(FavoriteProductsContext)