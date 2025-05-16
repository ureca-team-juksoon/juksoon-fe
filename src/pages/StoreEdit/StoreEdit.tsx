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
import formDataApi from "../../utils/formDataApi.ts";

interface StoreInfo {
  name: string;
  address: string;
  description: string;
  logoImageURL: string;
  image: File | null;
}

const StoreEdit: React.FC = () => {
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: "",
    address: "",
    description: "",
    logoImageURL: "https://placehold.co/150?text=Logo",
    image: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await formDataApi.get("/store");
        const dto = res.data.data;
        setStoreInfo({
          name: dto.name || "",
          address: dto.address || "",
          description: dto.description || "",
          logoImageURL: dto.logoImageURL || dto.logoUrl || "https://placehold.co/150?text=Logo",
          image: null,
        });
      } catch (err) {
        console.error("가게 정보를 불러오는 데 실패했어요:", err);
      }
    };
    void fetchStore();
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

      // 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file);

      setStoreInfo((prev) => ({
        ...prev,
        image: file, // ✅ 실제 파일 저장
        logoImageURL: previewUrl, // ✅ 미리보기용 이미지 URL 갱신
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📡 제출 함수 실행됨");

    const payload = new FormData();
    if(storeInfo.image){
      payload.append("image", storeInfo.image);
    }
    payload.append("name", storeInfo.name);
    payload.append("address", storeInfo.address);
    payload.append("description", storeInfo.description);


    for (const pair of payload.entries()) {
      console.log("📦", pair[0], pair[1]);
    }


    try {
      await formDataApi.patch(`/store`, payload);
      navigate("/mypage");
    } catch (err) {
      console.error("피드 등록/수정 실패:", err);
    }
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
              <LogoImage src={storeInfo.logoImageURL} alt="Store Logo" />
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
