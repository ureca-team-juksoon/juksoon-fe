import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { XMarkIcon, PhotoIcon, FilmIcon } from "@heroicons/react/24/outline";
import formDataApi from "../../utils/formDataApi.ts";
import {
  FeedFormWrapper,
  FeedFormContainer,
  PageTitle,
  FormContainer,
  FormField,
  Label,
  Input,
  Select,
  TextArea,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  FileInputText,
  ImagePreviewContainer,
  ImagePreview,
  PreviewImage,
  RemoveButton,
  ButtonsContainer,
  SubmitButton,
  DateRow,
  DateContainer,
  DateInputGroup,
  VideoPreviewContainer,
  VideoPreview
} from "./FeedForm.styles";
import { FeedFormData } from "./FeedForm.types";

const FeedForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FeedFormData>({
    title: "",
    content: "",
    category: "",
    startAt: new Date().toISOString().split("T")[0],
    startNow: true,
    expiredAt: new Date().toISOString().split("T")[0],
    maxUser: 5,
    price: 0,
    video: null,
    registeredUser: 0,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await formDataApi.get(`/feed/${id}`);
        const dto = res.data.data;
        setFormData({
          title: dto.title || "",
          content: dto.content || "",
          category: dto.category || "",
          expiredAt: dto.expiredAt || new Date().toISOString().split("T")[0],
          startAt:dto.startAt || new Date().toISOString().split("T")[0],
          price:dto.price || 0,
          maxUser:dto.maxUser || 5,
          video: null,
          registeredUser: 0,
          startNow: false,
        });
      } catch (err) {
        console.error("가게 정보를 불러오는 데 실패했어요:", err);
      }
    };
    void fetchStore();
  }, []);

  // 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "maxUser" || name === "price") {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 이미지 첨부
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 3 - imagePreviews.length);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...newFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    if (imagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 동영상 첨부
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, video: file }));
    setVideoPreview(url);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleRemoveVideo = () => {
    if (videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    setFormData(prev => ({ ...prev, video: null }));
    setVideoPreview("");
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    imageFiles.forEach(f => payload.append("images", f));
    if (formData.video) payload.append("video", formData.video);
    payload.append("title", formData.title);
    payload.append("content", formData.content);
    payload.append("category", formData.category);
    payload.append("startAt", formData.startAt);
    payload.append("expiredAt", formData.expiredAt);
    payload.append("maxUser", formData.maxUser.toString());
    payload.append("price", formData.price.toString());

    try {
      if (isEdit && id) await formDataApi.patch(`/feed/${id}`, payload);
      else await formDataApi.post("/feed", payload);
      navigate("/mypage");
    } catch (err) {
      console.error("피드 등록/수정 실패:", err);
    }
  };

  return (
      <FeedFormWrapper>
        <Header />
        <FeedFormContainer>
          <PageTitle>{isEdit ? "피드 수정하기" : "새로운 피드 등록하기"}</PageTitle>
          <FormContainer onSubmit={handleSubmit}>
            {/* 제목 */}
            <FormField>
              <Label htmlFor="title">제목</Label>
              <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
              />
            </FormField>

            {/* 내용 */}
            <FormField>
              <Label htmlFor="content">내용</Label>
              <TextArea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={5}
                  required
              />
            </FormField>

            {/* 카테고리 */}
            <FormField>
              <Label htmlFor="category">카테고리</Label>
              <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
              >
                <option value="">카테고리 선택</option>
                <option value="KOREAN">한식</option>
                <option value="JAPANESE">일식</option>
                <option value="CHINESE">중식</option>
                <option value="WESTERN">양식</option>
                <option value="DESSERT">디저트</option>
                <option value="SNACK">분식</option>
              </Select>
            </FormField>

            {/* 시작일 & 바로 시작하기 */}
            <DateRow>
              <DateContainer>
                <FormField>
                  <Label htmlFor="startAt">시작일</Label>
                  <DateInputGroup>
                    <Input
                        type="date"
                        id="startAt"
                        name="startAt"
                        value={formData.startAt}
                        onChange={handleChange}
                        disabled={formData.startNow}
                        required
                    />
                  </DateInputGroup>
                  <CheckboxContainer>
                    <Checkbox
                        type="checkbox"
                        id="startNow"
                        name="startNow"
                        checked={formData.startNow}
                        onChange={handleChange}
                    />
                    <CheckboxLabel htmlFor="startNow">바로 시작하기</CheckboxLabel>
                  </CheckboxContainer>
                </FormField>
              </DateContainer>

              <DateContainer>
                <FormField>
                  <Label htmlFor="expiredAt">방문일</Label>
                  <Input
                      type="date"
                      id="expiredAt"
                      name="expiredAt"
                      value={formData.expiredAt}
                      onChange={handleChange}
                      required
                  />
                </FormField>
              </DateContainer>
            </DateRow>

            {/* 모집 인원 */}
            <FormField>
              <Label htmlFor="maxUser">모집 인원</Label>
              <Select
                  id="maxUser"
                  name="maxUser"
                  value={formData.maxUser}
                  onChange={handleChange}
                  required
                  disabled={isEdit}
              >
                {[...Array(100)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}명</option>
                ))}
              </Select>
            </FormField>

            {/* 가격 */}
            <FormField>
              <Label htmlFor="price">가격</Label>
              <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="가격을 입력해주세요"
                  required
              >
              </Input>
            </FormField>

            {/* 이미지 첨부 */}
            <FormField>
              <Label>사진 첨부 ({imagePreviews.length}/3)</Label>
              <FileInputContainer>
                <FileInputLabel htmlFor="images" disabled={imagePreviews.length>=3}>
                  <PhotoIcon width={20} height={20} />
                  <FileInputText>사진 업로드</FileInputText>
                </FileInputLabel>
                <FileInput
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    ref={imageInputRef}
                    disabled={imagePreviews.length>=3}
                />
              </FileInputContainer>
              {imagePreviews.length>0 && (
                  <ImagePreviewContainer>
                    {imagePreviews.map((src,idx)=>(
                        <ImagePreview key={idx}>
                          <PreviewImage src={src} alt={`미리보기 ${idx+1}`} />
                          <RemoveButton type="button" onClick={()=>handleRemoveImage(idx)}><XMarkIcon width={16} height={16} /></RemoveButton>
                        </ImagePreview>
                    ))}
                  </ImagePreviewContainer>
              )}
            </FormField>

            {/* 동영상 첨부 */}
            <FormField>
              <Label>동영상 첨부</Label>
              <FileInputContainer>
                <FileInputLabel htmlFor="video" disabled={!!videoPreview}>
                  <FilmIcon width={20} height={20} />
                  <FileInputText>동영상 업로드</FileInputText>
                </FileInputLabel>
                <FileInput
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                    ref={videoInputRef}
                    disabled={!!videoPreview}
                />
              </FileInputContainer>
              {videoPreview && (
                  <VideoPreviewContainer>
                    <VideoPreview>
                      <video src={videoPreview} controls width="100%" height="100%" />
                      <RemoveButton type="button" onClick={handleRemoveVideo}><XMarkIcon width={16} height={16} /></RemoveButton>
                    </VideoPreview>
                  </VideoPreviewContainer>
              )}
            </FormField>

            <ButtonsContainer>
              <SubmitButton type="submit">{isEdit?"수정 완료":"등록 완료"}</SubmitButton>
            </ButtonsContainer>
          </FormContainer>
        </FeedFormContainer>
      </FeedFormWrapper>
  );
};

export default FeedForm;