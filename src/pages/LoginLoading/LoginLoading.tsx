import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  LoadingContainer,
  LoadingIcon,
  LoadingText,
  LoadingStatus,
} from "./LoginLoading.styles";
import axios from "../../utils/axios.ts";

const LoginLoading: React.FC = () => {
  const navigate = useNavigate();

  useEffect(  () => {
    //const role = localStorage.getItem("role");

    const timer = setTimeout(async () => {

      const user = await axios.get("/login");
       localStorage.setItem("role", user.data.data.userRole);
       localStorage.setItem("nickname", user.data.data.nickname);

      //const role = localStorage.getItem("role");
      const role = user.data.data.userRole;

      //const role = localStorage.getItem("role");
      console.log("✅ 저장된 role:", role);

      if (role === "ROLE_TESTER" || role === "ROLE_OWNER") {
        console.log("➡️ navigate to /home");
        navigate("/home");
      } else {
        console.log("➡️ navigate to /login/onboarding");
        navigate("/login/onboarding");
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
