import { AxiosError } from 'axios';
import { contextPath, request } from "../api";
import { ErrorException } from "../error-exception";
import { RegisterRequest } from "./register-request";
import { RegisterResponse } from "./register-response";

export const register = async (requestData: RegisterRequest): Promise<RegisterResponse> => {
  const path = `/${contextPath}/signup`;

  try {
    const response = await request.put<RegisterResponse>(path, requestData);
    return response.data;
  } catch (err) {
    throw new ErrorException((err as AxiosError).message)
  }
}