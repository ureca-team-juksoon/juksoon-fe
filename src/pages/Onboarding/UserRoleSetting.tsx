import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  LoadingContainer,
  LoadingIcon,
  LoadingText,
  LoadingStatus,
} from "./UserRoleSetting.styles.ts";

const UserRoleSetting: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 OnboardingPage로 이동
    // 실제로는 API 호출 등 로그인 로직 추가
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingContainer>
      <LoadingIcon>
        <img src={logo} alt="Logo" />
      </LoadingIcon>
      <LoadingText>죽순의 회원이 되신 것을 환영합니다 : )</LoadingText>
      <LoadingStatus>대나무가 될 회원님의 성장을 기대해요!</LoadingStatus>
    </LoadingContainer>
  );
};

export default UserRoleSetting;
