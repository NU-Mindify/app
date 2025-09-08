// axios-logger.js
import axios from "axios";


  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      console.log("📡 Axios Request:", {url: config.url,});
      return config;
    },
    (error) => {
      console.error("❌ Axios Request Error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => {
      console.log("✅ Axios Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error) => {
      console.error("❌ Axios Response Error:", {
        url: error.config?.url,
        message: error.message,
        response: error.response,
      });
      return Promise.reject(error);
    }
  );

