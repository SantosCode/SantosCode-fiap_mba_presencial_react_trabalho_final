import React, { ReactElement, useEffect, useState, useCallback, useMemo } from 'react'
import { ProductDetails } from '../../models/product-details'
import ProductDetailsView from "./product-details-view"
import {ProductsDetailsContext, useProductDetailsProvider} from "../../contexts/products-details-provider"
import {LocationContext, useLocationProvider} from "../../contexts/location-provider"
import {fetchProductDetails, changeProductFavoriteStatus} from "../../services/products/products-service"
import Storage from '../../../utils/storage'
import { User } from '../../models/user'
import {AuthContext, useAuthProvider} from "../../contexts/auth-provider"

interface ProviderProps {
  id?: string;
}

const ProductDetailsProvider = ({ id }: ProviderProps): ReactElement => {
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [location, setLocation] = useState<GeolocationPosition>();
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [user, setUser] = useState<User>()

  const storage = useMemo(() => new Storage(), []);

  const handleFetchProductDetails = useCallback(async () => {
    const user = storage.getItem<User>()

    const response = await fetchProductDetails({
      id,
      token: user?.token
    })

    setProductDetails(response)
  }, [id, storage])

  useEffect(() => {
    if (id !== undefined) {
      handleFetchProductDetails()
    }
  }, [id, handleFetchProductDetails])

  useEffect(() => {
    if (location === undefined) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation(position)
        }, (error) => {
  
        })
      }
    }
  })

  useEffect(() => {
    const getPermissionStatus = async () => {
      const permissionStatus = await navigator.permissions.query({ name: "geolocation" })

      setHasPermission(permissionStatus.state === "granted")
    }

    getPermissionStatus()
  })

  useEffect(() => {
    const storageUser = storage.getItem<User>()
    
    if (storageUser !== undefined) {
      setUser(storageUser)
    }
  }, [storage])

  return (
    <ProductsDetailsContext.Provider value={{
      productDetails,
      setProductDetails,
      fetchProductDetails: handleFetchProductDetails
    }}>
      <LocationContext.Provider value={{
        setGeolocationPositions: setLocation,
        geolocationPositions: location,
        hasPermission
      }}>
        <AuthContext.Provider value={{
          setUser,
          user
        }}>
          <ProductDetailsController id={id} />
        </AuthContext.Provider>
      </LocationContext.Provider>
    </ProductsDetailsContext.Provider>
  )
}

interface ControllerProps {
  id?: string;
}

const ProductDetailsController = ({ id, }: ControllerProps): ReactElement => {
  const {productDetails, fetchProductDetails} = useProductDetailsProvider()
  const { geolocationPositions, hasPermission } = useLocationProvider();
  const [isFavLoading, setIsFavLoading] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useAuthProvider()

  const handleFavoriteButtonClick = async (): Promise<void> => {
    try {
      setIsFavLoading(true)

      await changeProductFavoriteStatus({
        productId: id,
        token: user?.token,
      })

      await fetchProductDetails({ id, token: user?.token })

      setIsFavLoading(false)
    } catch (err) {
      setSnackbarOpen(true)
      setIsFavLoading(false)
    }
  }

  return (
    <ProductDetailsView 
      productDetails={productDetails} 
      geolocationPositions={geolocationPositions}
      hasPermission={hasPermission}
      handleFavoriteButtonClick={handleFavoriteButtonClick}
      isFavLoading={isFavLoading}
      isSnackbarOpen={isSnackbarOpen}
      closeSnackbar={() => setSnackbarOpen(false)}
      user={user}
    />
  )
}

export default ProductDetailsProvider