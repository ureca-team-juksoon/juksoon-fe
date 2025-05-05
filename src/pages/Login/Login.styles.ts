import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Logo = styled.div`
  color: #5c8f52;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 3rem;
  color: #000000;
`;

export const KakaoButton = styled.button`
  background-color: #fff07b;
  color: #000;
  padding: 0.8rem;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9e000;
  }
`;
