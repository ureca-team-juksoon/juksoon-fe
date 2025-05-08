import styled from "styled-components";

export const FormContainer = styled.form`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

export const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  text-align: left;
  font-weight: 600;
  color: #444;
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
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 2px rgba(92, 143, 82, 0.2);
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FileInputLabel = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#5c8f52")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: background-color 0.2s;

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

export const FilePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const FilePreview = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eaeaea;
`;

export const FilePreviewImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveFileButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  color: #ff5252;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 동영상 미리보기 컨테이너 추가
export const VideoPreviewContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-width: 500px;
`;

export const VideoPreview = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eaeaea;
  aspect-ratio: 16/9;
  background-color: #000;
`;

export const SubmitButton = styled.button`
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 2rem auto 0;
  padding: 0.8rem 0;
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
