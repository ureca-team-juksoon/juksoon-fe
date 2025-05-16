import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LoginLoading from "./pages/LoginLoading/LoginLoading";
import Onboarding from "./pages/Onboarding/Onboarding";
import FeedDetail from "./pages/FeedDetail/FeedDetail";
import MyPage from "./pages/MyPage/MyPage";
import TesterReviewDetail from "./pages/TesterReviewDetail/TesterReviewDetail";
import StoreEdit from "./pages/StoreEdit/StoreEdit";
import FeedForm from "./pages/FeedForm/FeedForm";
import UserRoleSetting from "./pages/Onboarding/UserRoleSetting.tsx";
import OwnerFeedDetail from "./pages/OwnerFeedDetail/OwnerFeedDetail.tsx";

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

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        {/* 로그인 관련 페이지들 */}
        <Route path="/" element={<Login />} />
        <Route path="/login/loading" element={<LoginLoading />} />
        <Route path="/login/onboarding" element={<Onboarding />} />
          <Route path="/login/roleSetting" element={<UserRoleSetting/>} />

          <Route path="/home" element={<Home />} />

        {/* 이벤트 상세 페이지 */}
        <Route path="/feed/:id" element={<FeedDetail />}/>

        {/* 피드 추가 페이지 */}
        <Route path="/feed/create" element={<FeedForm />}/>

        {/* 피드 수정 페이지 */}
        <Route path="/feed/edit/:id" element={<FeedForm />}/>

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />}/>

        {/* 가게 정보 편집 페이지 (owner 용) */}
        <Route path="/store/edit" element={<StoreEdit />}/>

        {/* 테스터 리뷰 페이지 */}
        <Route path="/review/:id" element={<TesterReviewDetail />}/>

        {/* 오너 피드 상세 페이지 */}
        <Route path="/feed/owner/:id" element={<OwnerFeedDetail />}/>

        {/* 일단 모든 다른 경로는 /login으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
