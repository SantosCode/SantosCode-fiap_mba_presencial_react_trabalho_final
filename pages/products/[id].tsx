import React, { ReactElement } from 'react'
import ProductDetailsController from "../../src/scenes/product-details/product-details-controller"
import { useRouter } from 'next/router'

const ProductDetails = (): ReactElement => {
  const router = useRouter();

  const { query } = router;

  return (
    <ProductDetailsController id={query.id as string} />
  )
}

export default ProductDetails