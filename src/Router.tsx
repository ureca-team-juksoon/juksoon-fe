import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginLoading from "./pages/LoginLoading";
import OnboardingPage from "./pages/OnboardingPage";

// 로그인 상태를 확인하는 보호된 라우트 컴포넌트
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const hasLoggedInBefore = localStorage.getItem("hasLoggedInBefore");
//
//   if (!hasLoggedInBefore) {
//     // 로그인 되지 않은 상태면 로그인 페이지로 리다이렉트
//     return <Navigate to="/login" replace />;
//   }
//
//   return <>{children}</>;
// };

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 로그인 관련 페이지들 */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/loading" element={<LoginLoading />} />
        <Route path="/login/onboarding" element={<OnboardingPage />} />

        {/* /home으로 접근할 수 있고 로그인이 필요함 */}
        {/*<Route*/}
        {/*  path="/home"*/}
        {/*  element={*/}
        {/*    <ProtectedRoute>*/}
        {/*      <Home />*/}
        {/*    </ProtectedRoute>*/}
        {/*  }*/}
        {/*/>*/}

        {/* 일단 모든 다른 경로는 /login으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
