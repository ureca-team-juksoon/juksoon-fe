import styled from "styled-components";

export const FeedDetailWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

export const FeedDetailContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const FeedTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: #222;
`;

export const FeedContentLayout = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const FeedImageSection = styled.div`
  flex: 1.2;
  max-width: 600px;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

export const FeedImage = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ImageNavigationContainer = styled.div`
  position: relative;
`;

export const FeedImageNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 1rem;
`;

export const NavigationButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }
`;

export const FeedDetailsSection = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

export const DetailRow = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.2rem;

  &:last-of-type {
    border-bottom: none;
  }

  &.last-row {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0.5rem;
  }
`;

export const DetailLabel = styled.div`
  width: 120px;
  font-weight: 600;
  color: #444;

  ${DetailRow}:nth-last-child(1) & {
    border-bottom: none;
  }
`;

export const DetailValue = styled.div`
  flex: 1;
  font-weight: 500;
  color: #333;
`;

export const FeedDescription = styled.div`
  margin-top: 1rem;
  line-height: 1.6;
`;

export const FeedContent = styled.div`
  white-space: pre-wrap;
  color: #555;
  line-height: 1.8;
  font-size: 0.95rem;
  background-color: #f9f9f9;
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 3px solid #8eb69b;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const ApplyButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 1.2rem;
  border-radius: 12px;
  background-color: ${(props) => (props.$active ? "#ff6b6b" : "#aaa")};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${(props) => (props.$active ? "pointer" : "not-allowed")};
  border: none;
  transition: all 0.3s;
  box-shadow: ${(props) =>
    props.$active ? "0 4px 12px rgba(255, 107, 107, 0.3)" : "none"};

  &:hover {
    background-color: ${(props) => (props.$active ? "#ff5252" : "#aaa")};
    transform: ${(props) => (props.$active ? "translateY(-2px)" : "none")};
  }
`;

export const CountdownTimer = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #666;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 0.6rem;
`;

export const FeedInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #666;

  svg {
    margin-right: 0.5rem;
  }
`;

export const StatusTag = styled.div<{ $status: "open" | "closed" }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  background-color: ${(props) =>
    props.$status === "open" ? "#8EB69B30" : "#ff525230"};
  color: ${(props) => (props.$status === "open" ? "#2E7D32" : "#D32F2F")};
`;

export const ParticipantsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
  font-size: 1rem;
  color: #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  p {
    color: #5c8f52;
    font-weight: bold;
    margin-left: 0.3rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modalAppear 0.3s ease-out forwards;

  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const ModalText = styled.p`
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.6;
  font-size: 1.1rem;
`;

export const ModalButton = styled.button`
  padding: 1rem 2.5rem;
  border-radius: 30px;
  background-color: #333;
  color: white;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #000;
    transform: translateY(-2px);
  }
`;
