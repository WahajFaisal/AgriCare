import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage('user');
  // console.log(user._id,"KKK")
  if (user) {
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
