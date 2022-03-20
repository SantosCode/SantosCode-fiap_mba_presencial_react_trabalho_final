import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Routes } from '../../../utils/routes'
import Storage from '../../../utils/storage'
import { useAuthProvider } from "../../contexts/auth-provider"
import { User } from '../../models/user'
import { login } from "../../services/login/login-service"
import { register } from "../../services/register/register-service"
import RegisterView from "./register-view"
import { RegisterFormValues } from "./validation"

const RegisterController = (): ReactElement => {
  const [externalError, setExternalError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const { setUser } = useAuthProvider()

  const storage = new Storage();

  useEffect(() => {
    const user = storage.getItem<User>();

    if (user !== undefined) {
      setUser(user)

      router.push(Routes.HOME)
    }
  })

  const handleRegister = async (values: RegisterFormValues): Promise<void> => {
    try {
      setLoading(true)
      setExternalError(undefined)

      await register(values)

      const loginResponse = await login({ email: values.email, password: values.password })

      setLoading(false)

      storage.setItem<User>(loginResponse)

      router.push(Routes.HOME)
    } catch (err) {
      setExternalError("Algo deu errado. Tente novamente")

      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push(Routes.LOGIN)
  }

  return (
    <RegisterView
      handleRegister={handleRegister}
      externalError={externalError}
      handleBack={handleBack}
      isLoading={isLoading}
    />
  )
}

export default RegisterController