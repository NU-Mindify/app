import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Added Token");
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;