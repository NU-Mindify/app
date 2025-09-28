import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { API_URL } from "./constants";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('token')
    const idToken = await getAuth().currentUser.getIdToken();
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
      console.log("Added Token");
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;