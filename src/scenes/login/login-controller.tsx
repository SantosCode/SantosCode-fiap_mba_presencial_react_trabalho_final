import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Routes } from "../../../utils/routes"
import Storage from "../../../utils/storage"
import { useAuthProvider } from "../../contexts/auth-provider"
import { User } from '../../models/user'
import { ErrorException } from "../../services/error-exception"
import { login } from "../../services/login/login-service"
import LoginView from "./login-view"
import { LoginFormValues } from "./validation"

const LoginController = (): ReactElement | null => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string>();

  const router = useRouter()
  const { setUser } = useAuthProvider()

  const storage = new Storage()

  useEffect(() => {
    const user = storage.getItem<User>();

    if (user !== undefined) {
      setUser(user)

      router.push(Routes.HOME)
    }
  })

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    try {
      setLoading(true)

      const responseUser = await login({
        email: values.email,
        password: values.password
      });

      storage.setItem<User>(responseUser);

      setUser(responseUser)

      router.push(Routes.HOME)

      setLoading(false)
    } catch (err) {
      setLoading(false)

      const serviceError = err as ErrorException;

      setError(serviceError.message)
    }
  }

  const handleRegister = (): void => {
    router.push(Routes.REGISTER)
  }

  return (
    <LoginView
      handleLogin={handleLogin}
      isLoading={isLoading}
      externalError={error}
      handleRegister={handleRegister}
    />
  )
}

export default LoginController