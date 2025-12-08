import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Proxy in vite.config.js handles routing to backend
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
