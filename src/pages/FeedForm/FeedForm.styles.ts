import styled from "styled-components";

export const FeedFormWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

export const FeedFormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

export const FormContainer = styled.form`
  width: 100%;
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
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

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3cpath fill='none' d='M0 0h24v24H0z'/%3e%3cpath d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z' fill='rgba(0,0,0,0.5)'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1.2rem;
  padding-right: 2.5rem;

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
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 2px rgba(92, 143, 82, 0.2);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 18px;
  height: 18px;
  accent-color: #5c8f52;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #555;
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const FileInputLabel = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#5c8f52")};
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#4a7a42")};
  }
`;

export const FileInputText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const BaseButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled(BaseButton)`
  background-color: #5c8f52;
  color: white;
  border: none;
  box-shadow: 0 4px 8px rgba(92, 143, 82, 0.3);

  &:hover {
    background-color: #4a7a42;
    transform: translateY(-2px);
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: #f0f0f0;
  color: #333;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
  }
`;

export const DateRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DateContainer = styled.div`
  flex: 1;
`;

export const DateInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
