import axios from "axios";
import { baseURL } from "./baseURL";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    // const token = await AsyncStorage.getItem("token");
    // if (token !== "" && token) {
    //   config.headers["Authorization"] = `token ${token}`;
    // }

    if (config.headers) {
      config.headers.connectin = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
