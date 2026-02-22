import axios from "axios";

export const API = axios.create({
  baseURL: "https://your-backend.onrender.com/api"
});