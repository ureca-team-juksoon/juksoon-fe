import styled, { keyframes } from "styled-components";

// 슬라이드 업 애니메이션 키프레임
const slideUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// 페이드 인 애니메이션
const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const StoreRegistrationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 상단3rem, 좌우2rem, 하단8rem padding 설정 */
    min-height: 70vh;
    padding: 3rem 2rem 8rem;
    width: 100%;
    max-width: 840px;
`;

export const FormContainer = styled.form`
    width: 100%;
    max-width: 800px;
    background: #ffffff;
    padding: 3rem;
    border-radius: 1.5rem;
    border-left: 6px solid #5c8f52;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    opacity: 0;
    animation: ${slideUp} 0.6s ease-out 0.3s forwards,
    ${fadeIn} 0.6s ease-in 0.3s forwards;
    /* 폼 하단 여백 추가 */
    margin-bottom: 1rem;
`;

export const FormField = styled.div`
    margin-bottom: 1.75rem;
    display: flex;
    flex-direction: column;
`;

// Logo 관련 섹션
export const LogoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.5rem;
    animation: ${fadeIn} 0.8s ease-in;

    p {
        margin-top: 0.75rem;
        font-size: 0.9rem;
        color: #4a5568;
    }
`;

export const LogoContainer = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5rem;
`;

export const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

export const LogoEditButton = styled.button`
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, background-color 0.2s;

    &:hover {
        background-color: #f0f0f0;
        transform: scale(1.1);
    }
`;

export const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
    text-align: left;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #2d3748;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 3px rgba(92, 143, 82, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #2d3748;
  resize: vertical;
  min-height: 140px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 3px rgba(92, 143, 82, 0.2);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

export const SubmitButton = styled.button`
  padding: 0.85rem 2.25rem;
  background: linear-gradient(135deg, #5c8f52 0%, #4a7a42 100%);
  color: #ffffff;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;
