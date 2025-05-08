import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 2rem auto;
  max-width: 500px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: rgba(92, 143, 82, 0.1);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  color: #5c8f52;
  animation: ${pulse} 2s infinite ease-in-out;
`;

export const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.75rem;
`;

export const EmptyStateMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

export const EmptyStateButton = styled.button`
  background-color: #5c8f52;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4a7a42;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(92, 143, 82, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
