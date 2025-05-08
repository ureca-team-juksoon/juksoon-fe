import styled from "styled-components";

export const StoreEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const StoreEditContainer = styled.main`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const StoreEditTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

export const FormContainer = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }
`;

export const LogoContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LogoEditButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-align: left;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 2px rgba(92, 143, 82, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 2px rgba(92, 143, 82, 0.2);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #5c8f52;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4a7a42;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(92, 143, 82, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
