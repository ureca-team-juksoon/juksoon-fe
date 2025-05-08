import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  StoreEditWrapper,
  StoreEditContainer,
  StoreEditTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  TextArea,
  LogoSection,
  LogoContainer,
  LogoImage,
  LogoEditButton,
  SubmitButton,
  ButtonsContainer,
  CancelButton,
} from "./StoreEdit.styles";
import { PencilIcon } from "@heroicons/react/24/outline";

interface StoreInfo {
  name: string;
  address: string;
  description: string;
  logo: string;
}

const StoreEdit: React.FC = () => {
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: "",
    address: "",
    description: "",
    logo: "https://placehold.co/150?text=Logo",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem("storeInfo");
    if (storedInfo) {
      setStoreInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setStoreInfo((prev) => ({
            ...prev,
            logo: e.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save store info to localStorage
    localStorage.setItem("storeInfo", JSON.stringify(storeInfo));
    navigate("/mypage");
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <StoreEditWrapper>
      <Header />
      <StoreEditContainer>
        <StoreEditTitle>가게 정보 수정</StoreEditTitle>

        <FormContainer onSubmit={handleSubmit}>
          <LogoSection>
            <LogoContainer>
              <LogoImage src={storeInfo.logo} alt="Store Logo" />
              <LogoEditButton type="button" onClick={handleLogoClick}>
                <PencilIcon width={20} height={20} />
              </LogoEditButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleLogoChange}
              />
            </LogoContainer>
            <p>대표 이미지 (로고)</p>
          </LogoSection>

          <FormGroup>
            <Label htmlFor="name">가게 이름</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={storeInfo.name}
              onChange={handleChange}
              placeholder="가게 이름을 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="address">주소</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={storeInfo.address}
              onChange={handleChange}
              placeholder="주소를 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">상세 설명</Label>
            <TextArea
              id="description"
              name="description"
              value={storeInfo.description}
              onChange={handleChange}
              placeholder="가게에 대한 상세 설명을 입력하세요"
              rows={5}
            />
          </FormGroup>

          <ButtonsContainer>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
            <SubmitButton type="submit">수정 완료</SubmitButton>
          </ButtonsContainer>
        </FormContainer>
      </StoreEditContainer>
    </StoreEditWrapper>
  );
};

export default StoreEdit;
