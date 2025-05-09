import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for authentication (if needed)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
