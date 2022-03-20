import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Storage from "../../../utils/storage";
import { AuthContext, useAuthProvider } from "../../contexts/auth-provider";
import { FavoriteProductsContext, useFavoriteProductsProvider } from "../../contexts/favorite-products";
import { FavoriteProducts } from '../../models/favorite-products';
import { User } from '../../models/user';
import { fetchFavoriteProducts } from "../../services/products/products-service";
import FavoritesView from './favorites-view';

const FavoritesProvider = (): ReactElement => {
  const [user, setUser] = useState<User>()
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProducts>();
  const [isFetching, setFetching] = useState(false);

  const storage = useMemo(() => new Storage(), []);

  const handleFetchFavoriteProducts = useCallback(async (): Promise<void> => {
    try {
      setFetching(true)
      const response = await fetchFavoriteProducts({ token: user?.token });

      setFavoriteProducts(response)
      setFetching(false)
    } catch (err) {
      setFetching(false)
    }
  }, [user])

  useEffect(() => {
    if (user?.token !== undefined) {
      handleFetchFavoriteProducts()
    }
  }, [handleFetchFavoriteProducts, user])

  useEffect(() => {
    const storageUser = storage.getItem<User>()

    if (storageUser !== undefined) {
      setUser(storageUser)
    }
  }, [storage])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FavoriteProductsContext.Provider value={{
        favoriteProducts,
        isFetching
      }}>
        <FavoritesController />
      </FavoriteProductsContext.Provider>
    </AuthContext.Provider>
  )
}

const FavoritesController = (): ReactElement => {
  const { user } = useAuthProvider()
  const { favoriteProducts, isFetching } = useFavoriteProductsProvider()

  return (
    <FavoritesView
      user={user}
      favoriteProducts={favoriteProducts}
      isFetching={isFetching}
    />
  )
}


export default FavoritesProvider;