import React, { useState, useRef } from "react";
import {
  FormContainer,
  FormTitle,
  FormField,
  Label,
  Input,
  TextArea,
  FileInput,
  FileInputLabel,
  FilePreviewContainer,
  FilePreview,
  FilePreviewImage,
  VideoPreviewContainer,
  VideoPreview,
  RemoveFileButton,
  SubmitButton,
  FileInputContainer,
  FileInputText,
} from "./ReviewForm.styles";
import { XMarkIcon, PhotoIcon, FilmIcon } from "@heroicons/react/24/outline";
import { ReviewData } from "../../../../../Users/stl99/바탕 화면/temp/pages/TesterReviewDetail/TesterReviewDetail.types";
import { ReviewFormProps } from "./ReviewForm.types";

const ReviewForm: React.FC<ReviewFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images || []
  );
  const [videoPreview, setVideoPreview] = useState<string | undefined>(
    initialData?.video
  );

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 최대 4개 이미지 제한
      const newImageFiles = [...imageFiles];
      const newPreviews = [...imagePreviews];

      Array.from(files).forEach((file) => {
        if (newPreviews.length < 4) {
          // URL 객체로 미리보기 URL 생성
          const previewUrl = URL.createObjectURL(file);
          newPreviews.push(previewUrl);
          newImageFiles.push(file);
        }
      });

      setImageFiles(newImageFiles);
      setImagePreviews(newPreviews);
    }

    // 파일 input 초기화
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }

    // 파일 input 초기화
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    if (newPreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }

    newImageFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setImageFiles(newImageFiles);
    setImagePreviews(newPreviews);
  };

  const handleRemoveVideo = () => {
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 이미지와 비디오 URL만 저장 (실제 파일 데이터는 메모리에 보관)
    const reviewData: ReviewData = {
      feedId: initialData?.feedId || 0,
      title,
      content,
      writer: "",
      images: imageFiles,
      video: videoInputRef.current?.files?.[0] || null, // ✅ 실제 비디오 파일 전달
      createdAt: initialData?.createdAt || new Date().toISOString(),
    //  video: videoPreview,
     // createdAt: initialData?.createdAt || new Date().toISOString(),
      // 실제 파일 객체는 메모리에 보관, 로컬스토리지에는 URL만 저장
    };

    onSubmit(reviewData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{initialData ? "리뷰 수정하기" : "리뷰 작성하기"}</FormTitle>

      <FormField>
        <Label htmlFor="title">제목</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="제목을 입력해주세요"
        />
      </FormField>

      <FormField>
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="내용을 꼼꼼하게 작성해주세요"
          rows={5}
        />
      </FormField>

      <FormField>
        <Label>사진 첨부 ({imagePreviews.length}/4)</Label>
        <FileInputContainer>
          <FileInputLabel htmlFor="images" disabled={imagePreviews.length >= 4}>
            <PhotoIcon width={24} height={24} />
            <FileInputText>사진 업로드</FileInputText>
          </FileInputLabel>
          <FileInput
            type="file"
            id="images"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
            disabled={imagePreviews.length >= 4}
            multiple
          />
        </FileInputContainer>

        {imagePreviews.length > 0 && (
          <FilePreviewContainer>
            {imagePreviews.map((image, index) => (
              <FilePreview key={index}>
                <FilePreviewImage src={image} alt={`Preview ${index}`} />
                <RemoveFileButton
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XMarkIcon width={16} height={16} />
                </RemoveFileButton>
              </FilePreview>
            ))}
          </FilePreviewContainer>
        )}
      </FormField>

      <FormField>
        <Label>동영상 첨부</Label>
        <FileInputContainer>
          <FileInputLabel htmlFor="video" disabled={!!videoPreview}>
            <FilmIcon width={24} height={24} />
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
              <RemoveFileButton type="button" onClick={handleRemoveVideo}>
                <XMarkIcon width={16} height={16} />
              </RemoveFileButton>
            </VideoPreview>
          </VideoPreviewContainer>
        )}
      </FormField>

      <SubmitButton type="submit">
        {initialData ? "리뷰 수정하기" : "리뷰 등록하기"}
      </SubmitButton>
    </FormContainer>
  );
};

export default ReviewForm;
