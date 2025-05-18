import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": undefined,
    },
});

export default api;