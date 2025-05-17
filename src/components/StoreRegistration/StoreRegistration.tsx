import React, { useState, useRef } from "react";
import api from "../../utils/axios.ts";
import {
  StoreRegistrationWrapper,
  FormContainer,
  FormField,
  Label,
  Input,
  TextArea,
  ButtonsContainer,
  SubmitButton,
  LogoSection,
  LogoContainer,
  LogoImage,
  LogoEditButton,
} from "./StoreRegistration.styles";
import { PencilIcon } from "@heroicons/react/24/outline";

interface StoreRegistrationProps {
  onSuccess: () => void;
}

const StoreRegistration: React.FC<StoreRegistrationProps> = ({ onSuccess }) => {
  const [logoPreview, setLogoPreview] = useState<string>(
      "https://placehold.co/200?text=Logo"
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = new FormData();
      if (logoFile) payload.append("image", logoFile);
      payload.append("name", storeName);
      payload.append("address", address);
      payload.append("description", description);

      await api.post("/store", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSuccess();
    } catch (err: any) {
      console.error("가게 정보 등록 오류:", err);
      setError("가게 등록 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <StoreRegistrationWrapper>
        <LogoSection>
          <LogoContainer>
            <LogoImage src={logoPreview} alt="Store Logo" />
            <LogoEditButton type="button" onClick={handleLogoClick}>
              <PencilIcon width={20} height={20} />
            </LogoEditButton>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleLogoChange}
            />
          </LogoContainer>
          <p>대표 이미지 (로고)</p>
        </LogoSection>

        <FormContainer onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="storeName">가게명</Label>
            <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="죽순 카페"
                required
            />
          </FormField>

          <FormField>
            <Label htmlFor="address">주소</Label>
            <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="서울시 강남구 ..."
                required
            />
          </FormField>

          <FormField>
            <Label htmlFor="description">상세 설명</Label>
            <TextArea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="가게의 특징, 운영 시간, 특별 메뉴 등을 자유롭게 적어주세요."
            />
          </FormField>

          {error && (
              <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
                {error}
              </p>
          )}

          <ButtonsContainer>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "등록 중..." : "가게 정보 등록"}
            </SubmitButton>
          </ButtonsContainer>
        </FormContainer>
      </StoreRegistrationWrapper>
  );
};

export default StoreRegistration;
