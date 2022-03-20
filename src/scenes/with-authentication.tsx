/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import React from 'react'
import Storage from "../../utils/storage"
import { User } from '../models/user'

// eslint-disable-next-line react/display-name
const WithAuthentication = <Props extends object>(Component: React.ComponentType<Props>) => (props: Props) => {
  if (typeof window !== "undefined") {
    const router = useRouter();

    const user = new Storage().getItem<User>();

    if (user === undefined) {
      router.replace("/")
      return null
    }

    return <Component {...props} />
  }

  return null
}

export default WithAuthentication;