import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  LoadingContainer,
  LoadingIcon,
  LoadingText,
  LoadingStatus,
} from "./LoginLoading.styles";

const LoginLoading: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 OnboardingPage로 이동
    // 실제로는 API 호출 등 로그인 로직 추가
    const timer = setTimeout(() => {
      // 최초 로그인 여부 확인 (localStorage에 저장된 값 확인 등)
      const isFirstLogin = !localStorage.getItem("hasLoggedInBefore");

      if (isFirstLogin) {
        navigate("/login/onboarding");
      } else {
        navigate("/home"); // /home으로 리다이렉션 변경
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingContainer>
      <LoadingIcon>
        <img src={logo} alt="Logo" />
      </LoadingIcon>
      <LoadingText>대나무가 되기 위한 여정을 함께해요!</LoadingText>
      <LoadingStatus>로그인 하는 중...</LoadingStatus>
    </LoadingContainer>
  );
};

export default LoginLoading;
