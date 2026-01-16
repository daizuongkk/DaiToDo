import axios from "axios";

const api = axios.create({ baseURL: "https://daitodo.onrender.com/api" });

export default api;
