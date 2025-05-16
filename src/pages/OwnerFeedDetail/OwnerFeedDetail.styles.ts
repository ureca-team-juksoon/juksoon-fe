import styled from "styled-components";

export const ApplicantSection = styled.section`
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: #333;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: #5c8f52;
    }
  }

  p {
    text-align: center;
    color: #888;
    padding: 2rem 0;
    font-size: 1.1rem;
    font-style: italic;
  }
`;

export const ApplicantList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

export const ApplicantItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  span {
    color: #5c8f52;
    font-weight: 500;
    background-color: rgba(92, 143, 82, 0.1);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

export const ApplicantName = styled.p`
  font-weight: 500 !important;
  color: #333 !important;
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1rem !important;
  font-style: normal !important;
  text-align: left !important;
`;

export const ActionButtonWrapper = styled.div`
  margin: 2.5rem 0;
  display: flex;
  justify-content: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const EditButton = styled.button`
  padding: 0.9rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  border-radius: 10px;
  background: linear-gradient(145deg, #4a7a42, #5c8f52);
  box-shadow: 0 4px 15px rgba(92, 143, 82, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(92, 143, 82, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DeleteButton = styled.button`
  padding: 0.9rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  background-color: #ff5252;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);

  &:hover {
    background-color: #ff3333;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 82, 82, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ReviewSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

export const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #5c8f52;
  }
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ReviewItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const NoReviewsMessage = styled.p`
  text-align: center;
  color: #888;
  padding: 3rem 0;
  font-size: 1.1rem;
  font-style: italic;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px dashed #ddd;
`;

export const ConfirmModalOverlay = styled.div`
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

export const ConfirmModalContent = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
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

export const ConfirmModalTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const ConfirmModalText = styled.p`
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
  font-size: 1.1rem;
`;

export const ConfirmModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  & > button {
    min-width: 120px;
    flex: 1;
    max-width: 200px;
  }
`;
