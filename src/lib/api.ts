import axios from "axios";

const api = axios.create({
  baseURL: "https://api-ridenitt.duckdns.org",
  withCredentials: true,
});

export default api;