import api from "./axios.ts";

// ✅ 자동 리프레시 인터셉터
api.interceptors.response.use(
    res => res,
    async error => {
        const orig = error.config;
        const status = error.response?.status;

        // 맨 위에서 걸러야만 무한 루프를 끊을 수 있음
        if (status === 401 && orig.url?.endsWith('/refresh')) {
            window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
            return Promise.reject(error);
        }

        // 그 외 401만 리프레시 시도
        if (status === 401 && !orig._retry) {
            orig._retry = true;
            try {
                await api.post('/refresh');   // 이 코드는 이제 1번 분기에서 제외돼서 루프 안 돔
                return api(orig);
            } catch {
                window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
