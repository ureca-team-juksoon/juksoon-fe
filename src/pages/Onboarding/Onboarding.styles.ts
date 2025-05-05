import styled from "styled-components";

export const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: white;
  padding: 0 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const WelcomeTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #333;
`;

export const Question = styled.p`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
  text-align: center;
`;

export const SubText = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #666;
  margin-bottom: 3.5rem;
  font-weight: 400;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15rem;
  width: 100%;
  max-width: 600px;
  margin-bottom: 3rem;
`;

export const RoleButton = styled.button<{
  selected?: boolean;
  role: "owner" | "user";
}>`
  background-color: ${(props) => {
    if (props.selected) {
      return props.role === "owner" ? "#8EB69B" : "#86A8E7";
    }
    return props.role === "owner" ? "#D2E3C8" : "#D6E2F3";
  }};
  color: #333;
  border: none;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => {
      if (props.selected) {
        return props.role === "owner" ? "#8EB69B" : "#86A8E7";
      }
      return props.role === "owner" ? "#C1D6B3" : "#B9CBEC";
    }};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

export const ContinueButton = styled.button<{ disabled: boolean }>`
  padding: 1rem 3rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  margin-top: 1rem;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  }
`;
