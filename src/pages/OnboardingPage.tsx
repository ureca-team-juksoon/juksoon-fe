import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  padding: 0 2rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Question = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: #777;
  margin-bottom: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const RoleButton = styled.button<{ selected?: boolean }>`
  background-color: ${(props) => (props.selected ? "#8FBC8F" : "#D4E9D4")};
  color: ${(props) => (props.selected ? "#000" : "#000")};
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#8FBC8F" : "#C1E0C1")};
    transform: translateY(-3px);
  }
`;

const ContinueButton = styled.button<{ disabled: boolean }>`
  padding: 1rem 3rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  margin-top: 2rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"user" | "owner" | null>(
    null
  );

  const handleContinue = React.useCallback(() => {
    if (selectedRole) {
      // 역할 저장
      localStorage.setItem("userRole", selectedRole);
      // 최초 로그인 상태 저장 (다음에 온보딩 화면 안 보이게)
      localStorage.setItem("hasLoggedInBefore", "true");
      // 홈으로 리디렉트
      navigate("/home");
    }
  }, [selectedRole, navigate]);

  // 역할을 선택하면 자동으로 2초 후 홈으로 이동
  useEffect(() => {
    if (selectedRole) {
      const timer = setTimeout(() => {
        handleContinue();
      }, 800); // 0.8초 후 자동으로 계속 진행
      return () => clearTimeout(timer);
    }
  }, [selectedRole, handleContinue]);

  const handleRoleSelect = (role: "user" | "owner") => {
    setSelectedRole(role);
  };

  return (
    <OnboardingContainer>
      <WelcomeTitle>환영합니다 밍경님</WelcomeTitle>
      <Question>JUKSOON이 처음이신가요?</Question>
      <Description>죽순에서 활동할 역할을 선택해주세요</Description>

      <ButtonContainer>
        <RoleButton
          selected={selectedRole === "user"}
          onClick={() => handleRoleSelect("user")}
        >
          테스터
        </RoleButton>
        <RoleButton
          selected={selectedRole === "owner"}
          onClick={() => handleRoleSelect("owner")}
        >
          오너
        </RoleButton>
      </ButtonContainer>

      <ContinueButton disabled={!selectedRole} onClick={handleContinue}>
        계속하기
      </ContinueButton>
    </OnboardingContainer>
  );
};

export default OnboardingPage;
