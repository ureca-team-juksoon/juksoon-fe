import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { FeedData, feedData } from "../../data/feedData";
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
  CancelButton,
  DateRow,
  DateContainer,
  DateInputGroup,
} from "./FeedForm.styles";
import { FeedFormData } from "./FeedForm.types";

const FeedForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storeInfo, setStoreInfo] = useState({
    name: "가게 이름을 입력해주세요",
    address: "주소를 입력해주세요",
  });

  const [formData, setFormData] = useState<FeedFormData>({
    title: "",
    content: "",
    category: "",
    startDate: new Date().toISOString().split("T")[0],
    startNow: true,
    maxParticipants: 5,
    visitDate: new Date().toISOString().split("T")[0],
    images: [],
    price: 0,
    status: "open",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    // 가게 정보 로드
    const storedStoreInfo = localStorage.getItem("storeInfo");
    if (storedStoreInfo) {
      setStoreInfo(JSON.parse(storedStoreInfo));
    }

    // 수정 모드인 경우 피드 데이터 로드
    if (isEdit && id) {
      const feedId = parseInt(id);

      // localStorage에서 먼저 피드 데이터를 확인
      const storedFeedsJSON = localStorage.getItem("feedData");
      const storedFeeds = storedFeedsJSON
        ? JSON.parse(storedFeedsJSON)
        : feedData;

      const feed: FeedData | undefined = (storedFeeds as FeedData[]).find(
        (item: FeedData) => item.id === feedId
      );

      if (feed) {
        setFormData({
          id: feed.id,
          title: feed.title,
          content:
            feed.content ||
            "제가 카페는 처음이라 빽다방 단골 지점이랑 맛이 동일한지 좀 확인해보고 싶어요. 혹시 평소에 빽다방 자주 드시는 손님을 찾으신다면 오셔서 솔직 리뷰 부탁드립니다!",
          category: feed.category || "디저트",
          startDate: feed.startDate || new Date().toISOString().split("T")[0],
          startNow: feed.startNow !== undefined ? feed.startNow : true,
          maxParticipants: feed.maxParticipants,
          visitDate: feed.publishDate,
          images: feed.images || (feed.thumbnail ? [feed.thumbnail] : []),
          price: feed.price,
          status: feed.status,
        });
      }
    }
  }, [isEdit, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (name === "maxParticipants" || name === "price") {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || formData.images.length >= 3) return;

    const newImageFiles = [...imageFiles];
    const newImageUrls = [...formData.images];

    Array.from(files).forEach((file) => {
      if (newImageUrls.length < 3) {
        const imageUrl = URL.createObjectURL(file);
        newImageUrls.push(imageUrl);
        newImageFiles.push(file);
      }
    });

    setFormData({ ...formData, images: newImageUrls });
    setImageFiles(newImageFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    const newImageUrls = [...formData.images];

    if (newImageFiles[index] && newImageUrls[index].startsWith("blob:")) {
      URL.revokeObjectURL(newImageUrls[index]);
    }

    newImageFiles.splice(index, 1);
    newImageUrls.splice(index, 1);

    setImageFiles(newImageFiles);
    setFormData({ ...formData, images: newImageUrls });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // feedData의 초기값을 사용하는 대신 항상 localStorage를 먼저 확인
    const storedFeeds: FeedFormData[] = JSON.parse(
      localStorage.getItem("feedData") || JSON.stringify(feedData)
    );

    // 새로운 ID 생성 또는 기존 ID 사용
    const feedId = formData.id || Date.now();

    // 제출할 피드 데이터
    const submittedFeed = {
      id: feedId,
      title: formData.title,
      publishDate: formData.visitDate,
      author: storeInfo.name,
      price: formData.price,
      status: formData.status,
      participationCount: isEdit
        ? storedFeeds.find((f) => f.id === feedId)?.participationCount || 0
        : 0,
      maxParticipants: formData.maxParticipants,
      thumbnail: formData.images[0] || "",
      // 기존 feedData에 없는 필드들이지만 향후 확장을 위해서 추가
      content: formData.content,
      category: formData.category,
      startDate: formData.startDate,
      startNow: formData.startNow,
      images: formData.images,
    };

    if (isEdit) {
      // 기존 피드 업데이트
      const updatedFeeds = storedFeeds.map((feed) =>
        feed.id === feedId ? submittedFeed : feed
      );
      localStorage.setItem("feedData", JSON.stringify(updatedFeeds));

      // 수정 후 피드 상세 페이지로 리다이렉트
      navigate(`/feed/${feedId}`);
    } else {
      // 새 피드 추가
      const newFeeds = [...storedFeeds, submittedFeed];
      localStorage.setItem("feedData", JSON.stringify(newFeeds));

      // 새로운 피드 추가 후 마이페이지로 리다이렉트
      navigate("/mypage");
    }
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <FeedFormWrapper>
      <Header />
      <FeedFormContainer>
        <PageTitle>
          {isEdit ? "피드 수정하기" : "새로운 피드 등록하기"}
        </PageTitle>
        <FormContainer onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">제목</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="피드의 제목을 입력해주세요"
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="content">내용</Label>
            <TextArea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="피드에 들어갈 내용을 입력해주세요"
              rows={5}
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="category">카테고리</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                카테고리 선택
              </option>
              <option value="디저트">디저트</option>
              <option value="한식">한식</option>
              <option value="양식">양식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="분식">분식</option>
            </Select>
          </FormField>

          <DateRow>
            <DateContainer>
              <FormField>
                <Label htmlFor="startDate">이벤트 시작일</Label>
                <DateInputGroup>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
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
                  <CheckboxLabel htmlFor="startNow">
                    바로 시작하기
                  </CheckboxLabel>
                </CheckboxContainer>
              </FormField>
            </DateContainer>
            <DateContainer>
              <FormField>
                <Label htmlFor="visitDate">방문일</Label>
                <DateInputGroup>
                  <Input
                    type="date"
                    id="visitDate"
                    name="visitDate"
                    value={`${formData.visitDate}`}
                    onChange={handleChange}
                    required
                  />
                </DateInputGroup>
              </FormField>
            </DateContainer>
          </DateRow>

          <DateRow>
            <DateContainer>
              <FormField>
                <Label htmlFor="maxParticipants">모집 인원</Label>
                <Select
                  id="maxParticipants"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required
                >
                  {[...Array(100)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}명
                    </option>
                  ))}
                </Select>
              </FormField>
            </DateContainer>

            <DateContainer>
              <FormField>
                <Label htmlFor="price">가격</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="가격을 입력하세요"
                  required
                />
              </FormField>
            </DateContainer>
          </DateRow>

          <FormField>
            <Label>사진 첨부 ({formData.images.length}/3)</Label>
            <FileInputContainer>
              <FileInputLabel
                htmlFor="images"
                disabled={formData.images.length >= 3}
              >
                <PhotoIcon width={20} height={20} />
                <FileInputText>사진 업로드</FileInputText>
              </FileInputLabel>
              <FileInput
                type="file"
                id="images"
                accept="image/*"
                onChange={handleImageChange}
                disabled={formData.images.length >= 3}
                ref={fileInputRef}
              />
            </FileInputContainer>

            {formData.images.length > 0 && (
              <ImagePreviewContainer>
                {formData.images.map((image, index) => (
                  <ImagePreview key={index}>
                    <PreviewImage
                      src={image}
                      alt={`피드 이미지 ${index + 1}`}
                    />
                    <RemoveButton
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <XMarkIcon width={16} height={16} />
                    </RemoveButton>
                  </ImagePreview>
                ))}
              </ImagePreviewContainer>
            )}
          </FormField>

          <ButtonsContainer>
            <SubmitButton type="submit">
              {isEdit ? "수정 완료" : "등록 완료"}
            </SubmitButton>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
          </ButtonsContainer>
        </FormContainer>
      </FeedFormContainer>
    </FeedFormWrapper>
  );
};

export default FeedForm;
