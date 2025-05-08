import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LoginLoading from "./pages/LoginLoading/LoginLoading";
import OnboardingPage from "./pages/Onboarding/Onboarding";
import FeedDetail from "./pages/FeedDetail/FeedDetail";
import MyPage from "./pages/MyPage/MyPage";
import TesterReviewDetail from "./pages/TesterReviewDetail/TesterReviewDetail";
import StoreEdit from "./pages/StoreEdit/StoreEdit";
import FeedForm from "./pages/FeedForm/FeedForm";

// 로그인 상태를 확인하는 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasLoggedInBefore = localStorage.getItem("hasLoggedInBefore");

  if (!hasLoggedInBefore) {
    // 로그인 되지 않은 상태면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        {/* 로그인 관련 페이지들 */}
        <Route path="/" element={<Login />} />
        <Route path="/login/loading" element={<LoginLoading />} />
        <Route path="/login/onboarding" element={<OnboardingPage />} />

        {/* 홈 페이지 */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 이벤트 상세 페이지 */}
        <Route
          path="/feed/:id"
          element={
            <ProtectedRoute>
              <FeedDetail />
            </ProtectedRoute>
          }
        />

        {/* 피드 추가 페이지 */}
        <Route
          path="/feed/create"
          element={
            <ProtectedRoute>
              <FeedForm />
            </ProtectedRoute>
          }
        />

        {/* 피드 수정 페이지 */}
        <Route
          path="/feed/edit/:id"
          element={
            <ProtectedRoute>
              <FeedForm />
            </ProtectedRoute>
          }
        />

        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />

        {/* 가게 정보 편집 페이지 (owner 용) */}
        <Route
          path="/store/edit"
          element={
            <ProtectedRoute>
              <StoreEdit />
            </ProtectedRoute>
          }
        />

        {/* 테스터 리뷰 페이지 */}
        <Route
          path="/review/:id"
          element={
            <ProtectedRoute>
              <TesterReviewDetail />
            </ProtectedRoute>
          }
        />

        {/* 일단 모든 다른 경로는 /login으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
