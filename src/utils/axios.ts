import axios, { AxiosInstance } from "axios";
import { getAccessToken, setupTokenRefresh } from "./auth"; // auth.ts에서 토큰 갱신 로직 가져옴

// 서버 URL 설정
export const SERVER_URL = "http://localhost:8000";

// Axios Instance 생성
const api: AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // CORS 이슈 해결을 위한 설정
});

// 요청 interceptors: Authorization header에 token 추가
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터를 통해 자동으로 토큰 갱신 설정
setupTokenRefresh(api);

// API 호출 함수들
// 키워드 가져오기
// export async function getKeywords() {
//     try {
//         const response = await api.get("/keyword");
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch keywords:", error);
//         throw error;
//     }
// }

export default api;
