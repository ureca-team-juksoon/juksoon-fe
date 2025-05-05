import React from "react";
import styled from "styled-components";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #000;
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-3px);
    background-color: #333;
  }

  &:active {
    transform: translateY(0);
  }
`;

interface CreateEventButtonProps {
  onClick: () => void;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onClick }) => {
  return (
    <FloatingButton onClick={onClick} aria-label="이벤트 생성">
      +
    </FloatingButton>
  );
};

export default CreateEventButton;
