import { AxiosError } from "axios";
import { FavoriteProducts } from "../../models/favorite-products";
import { ProductDetails } from "../../models/product-details";
import { ProductsList } from "../../models/products-list";
import { contextPath, request } from "../api";
import { ErrorException } from "../error-exception";
import { EditFavoriteProductRequest } from './edit-product-request';
import { FetchFavoriteProductsResponse } from "./fetch-favorite-products-response";
import { FetchProductsRequest } from "./fetch-products-request";
import { FetchProductsListResponse } from "./fetch-products-response";
import { ProductDetailsRequest } from "./product-details-request";
import { ProductDetailsResponse } from "./product-details-response";

export const fetchProducts = async ({
  token,
  page = 1,
  perPage = 5,
  ...rest
}: FetchProductsRequest): Promise<ProductsList> => {
  const path = `/${contextPath}`

  try {
    const response = await request.get<FetchProductsListResponse>(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        perPage,
        ...rest
      }
    })

    return {
      ...response.data,
      products: response.data.products.map((product) => ({
        id: product._id,
        isFavorite: product.favorite,
        ...product
      }))
    };
  } catch(err) {
    const error = err as AxiosError

    throw new ErrorException(error.message, error.code)
  }
}

export const fetchProductDetails = async ({
  id,
  token
}: ProductDetailsRequest): Promise<ProductDetails> => {
  const path = `/${contextPath}/product/${id}`

  try {
    const response = await request.get<ProductDetailsResponse>(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return {
      ...response.data,
      product: {
        createdDate: response.data.product.createdDate,
        name: response.data.product.name,
        price: response.data.product.price,
        updatedDate: response.data.product.updatedDate,
        stores: response.data.product.stores,
        isFavorite: response.data.product.favorite
      }
    };
  } catch(err) {
    const error = err as AxiosError

    throw new ErrorException(error.message, error.code)
  }
}

export const changeProductFavoriteStatus = async (requestData: EditFavoriteProductRequest): Promise<void> => {
  const path = `/${contextPath}/manageFavorite`;

  try {
    await request.post(path, { productID: requestData.productId }, {
      headers: {
        Authorization: `Bearer ${requestData.token}`,
      }
    })
  } catch (err) {
    const error = err as AxiosError

    throw new ErrorException(error.message, error.code)
  }
}

export const fetchFavoriteProducts = async (requestData: { token?: string; }): Promise<FavoriteProducts> => {
  const path = `/${contextPath}/getFavProducts`;

  try {
    const { data } = await request.get<FetchFavoriteProductsResponse>(path, {
      headers: {
        Authorization: `Bearer ${requestData.token}`,
      }
    })

    return {
      products: data.products.map((product) => ({
        createdDate: new Date(product.createdDate),
        isFavorite: true,
        name: product.name,
        price: product.price,
        updatedDate: new Date(product.updatedDate),
        id: product._id,
        stores: product.stores.map((store) => ({
          name: store.name,
          address: store.address,
          latitude: store.latitude,
          longitude: store.longitude,
          _id: store._id
        }))
      }))
    }
  } catch (err) {
    const error = err as AxiosError

    throw new ErrorException(error.message, error.code)
  }
}