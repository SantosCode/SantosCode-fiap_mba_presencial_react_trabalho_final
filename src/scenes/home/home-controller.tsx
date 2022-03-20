import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import Storage from "../../../utils/storage"
import { AuthContext, useAuthProvider } from "../../contexts/auth-provider"
import { ProductsContext, useProductsProvider } from "../../contexts/products-provider"
import { ProductsList } from '../../models/products-list'
import { User } from '../../models/user'
import { FetchProductsRequest } from "../../services/products/fetch-products-request"
import { fetchProducts } from '../../services/products/products-service'
import WithAuth from "../with-authentication"
import HomeView from './home-view'

const HomeProvider = (): ReactElement => {
  const [user, setUser] = useState<User>()
  const [products, setProducts] = useState<ProductsList>();
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    const storage = new Storage();

    const storageUser = storage.getItem<User>()

    if (storageUser !== undefined) {
      setUser(storageUser)
    }
  }, [])

  const getProducts = async (values: Partial<FetchProductsRequest>): Promise<void> => {
    try {
      setFetching(true)
      const responseProducts = await fetchProducts({
        ...values,
        token: user?.token ?? ""
      })

      setProducts(responseProducts)
      setFetching(false)
    } catch (err) {
      setFetching(false)
    }
  }

  useEffect(() => {
    const handleFetchProducts = async (): Promise<void> => {
      try {
        setFetching(true)
        const responseProducts = await fetchProducts({
          token: user?.token ?? ""
        })

        setProducts(responseProducts)
        setFetching(false)
      } catch (err) {
        setFetching(false)
      }
    }

    if (user !== undefined) {
      handleFetchProducts()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ProductsContext.Provider value={{
        setProducts,
        productsList: products,
        fetchProducts: getProducts,
        isFetching
      }}>
        <HomeController />
      </ProductsContext.Provider>
    </AuthContext.Provider>
  )
}

const HomeController = (): ReactElement => {
  const { setUser } = useAuthProvider()
  const { fetchProducts } = useProductsProvider()
  const storage = new Storage()
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setNumberOfItemsPerPage] = useState(5);

  const handleLogout = (): void => {
    setUser(undefined)

    storage.removeItem()

    router.replace("/")
  }

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const numberOfItems = parseInt(event.target.value, 10);

    setNumberOfItemsPerPage(numberOfItems)

    fetchProducts({ page, perPage: numberOfItems })
  }

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage)

    fetchProducts({ page: newPage + 1, perPage: itemsPerPage })
  }

  return (
    <HomeView
      handleLogout={handleLogout}
      handleItemsPerPageChange={handleItemsPerPageChange}
      handlePageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
      page={page}
    />
  )
}

export default WithAuth(HomeProvider)