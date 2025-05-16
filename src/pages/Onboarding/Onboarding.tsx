import React, { useState } from "react";
import {
  OnboardingContainer,
  WelcomeTitle,
  Question,
  SubText,
  ButtonContainer,
  RoleButton,
  ContinueButton,
} from "./Onboarding.styles";
import api from "../../utils/axios.ts";

const Onboarding: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<
    "ROLE_TESTER" | "ROLE_OWNER" | null
  >(null);

  const nickname = localStorage.getItem("nickname");

  const handleContinue = async  ()  => {
    if (selectedRole) {
      // 역할 저장
      localStorage.setItem("role", selectedRole);
      // 역할 수정
      try {
        await api.post("/user/role", {
          userRole: selectedRole,
        });
      } catch (error){
        console.log ("사용자 정보를 수정 오류", error);
      }

      // 홈으로 리다이렉트
      window.location.href = "/login/roleSetting";
    }
  };

  const handleRoleSelect = (role: "ROLE_TESTER" | "ROLE_OWNER") => {
    setSelectedRole(role);
    }

  return (
    <OnboardingContainer>
      <WelcomeTitle>환영합니다 {nickname}님</WelcomeTitle>
      <Question>JUKSOON이 처음이신가요?</Question>
      <SubText>죽순에서 활동할 역할을 선택해주세요</SubText>

      <ButtonContainer>
        <RoleButton
          role="ROLE_OWNER"
          selected={selectedRole === "ROLE_OWNER"}
          onClick={() => handleRoleSelect("ROLE_OWNER")}
        >
          오너
        </RoleButton>
        <RoleButton
          role="ROLE_TESTER"
          selected={selectedRole === "ROLE_TESTER"}
          onClick={() => handleRoleSelect("ROLE_TESTER")}
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
