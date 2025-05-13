import React from "react";
import { useNavigate } from "react-router-dom";
import kakaoLogo from "../../assets/kakao.svg";
import { LoginContainer, Logo, Subtitle, KakaoButton } from "./Login.styles";
import api from "../../utils/axios.ts";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleKakaoLogin =  async  () => {
    try {
        const user = await api.get("/login");
        localStorage.setItem("role" , user.data.userRole);
        navigate("/login/loading");
    } catch (error) {
        console.log("사용자 정보 확인 에러" ,  error);
    }
  };

  return (
    <LoginContainer>
      <Logo>JUKSOON</Logo>
      <Subtitle>성공을 위한 가장 솔직한 리뷰</Subtitle>
      <KakaoButton onClick={handleKakaoLogin}>
        <img src={kakaoLogo} alt="카카오" width={24} height={24} />
        카카오톡으로 시작하기
      </KakaoButton>
    </LoginContainer>
  );
};

export default Login;
