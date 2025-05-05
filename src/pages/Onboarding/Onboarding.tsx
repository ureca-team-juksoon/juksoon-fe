import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  OnboardingContainer,
  WelcomeTitle,
  Question,
  SubText,
  ButtonContainer,
  RoleButton,
  ContinueButton,
} from "./Onboarding.styles";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"user" | "owner" | null>(
    null
  );

  const handleContinue = () => {
    if (selectedRole) {
      // 역할 저장
      localStorage.setItem("userRole", selectedRole);
      // 최초 로그인 상태 저장 (다음에 온보딩 화면 안 보이게)
      localStorage.setItem("hasLoggedInBefore", "true");
      // 홈으로 리다이렉트
      navigate("/home");
    }
  };

  const handleRoleSelect = (role: "user" | "owner") => {
    setSelectedRole(role);
  };

  return (
    <OnboardingContainer>
      <WelcomeTitle>환영합니다 밍경님</WelcomeTitle>
      <Question>JUKSOON이 처음이신가요?</Question>
      <SubText>죽순에서 활동할 역할을 선택해주세요</SubText>

      <ButtonContainer>
        <RoleButton
          role="owner"
          selected={selectedRole === "owner"}
          onClick={() => handleRoleSelect("owner")}
        >
          오너
        </RoleButton>
        <RoleButton
          role="user"
          selected={selectedRole === "user"}
          onClick={() => handleRoleSelect("user")}
        >
          테스터
        </RoleButton>
      </ButtonContainer>

      <ContinueButton disabled={!selectedRole} onClick={handleContinue}>
        계속하기
      </ContinueButton>
    </OnboardingContainer>
  );
};

export default Onboarding;
