import axios, { AxiosError } from "axios";
import Storage from "../../utils/storage";

export const contextPath = "storeProducts"

const TOKEN_EXPIRED_MESSAGE = "jwt expired";

let url: string = "";
if (process.env.APP_URL !== undefined) {
  url = process.env.APP_URL;
}

console.log(url);

const request = axios.create({
  baseURL: "https://fiap-reactjs-presencial.herokuapp.com",
});

request.interceptors.response.use((response) => {
  return response
}, async (error: AxiosError) => {
  const storage = new Storage();
  
  const { message } = error.response?.data;

  if (message !== undefined && message === TOKEN_EXPIRED_MESSAGE) {
    storage.removeItem();

    window.location.replace("/")
  }

  throw error;
})

export { request };
