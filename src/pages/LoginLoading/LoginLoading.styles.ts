import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: white;
  color: black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const LoadingIcon = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 0.5rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const LoadingText = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const LoadingStatus = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #484848;
`;
