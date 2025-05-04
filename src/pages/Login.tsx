import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const Logo = styled.div`
  color: #4caf50;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 3rem;
  color: #555;
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  color: #000;
  padding: 0.8rem 2rem;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  width: 300px;
  display: flex;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7d700;
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    navigate("/login/loading");
  };

  return (
    <LoginContainer>
      <Logo>JUKSOON</Logo>
      <Subtitle>성공을 위한 가장 솔직한 리뷰</Subtitle>
      <KakaoButton onClick={handleKakaoLogin}>
        카카오톡으로 시작하기
      </KakaoButton>
    </LoginContainer>
  );
};

export default Login;
