import { AxiosError } from "axios"
import { User } from "../../models/user"
import { contextPath, request } from "../api"
import { ErrorException } from "../error-exception"
import { LoginRequest } from "./login-request"

const INVALID_LOGIN_MESSAGE = "User Not Found";

const isUser = (data: any): data is User => {
  return "token" in data && "name" in data && "phone" in data;
}

export const login = async (requestData: LoginRequest): Promise<User> => {
  const path = `/${contextPath}/login`

  try {
    const response = await request.post(path, requestData)

    if (response.data.message === INVALID_LOGIN_MESSAGE) {
      throw new ErrorException("Login inválido")
    }

    if (isUser(response.data)) {
      return response.data
    }

    throw new ErrorException("Algo deu errado. Tente novamente");
  } catch (err) {
    const error = err as AxiosError

    throw new ErrorException(error.message, error.code)
  }
}