import React from "react";
import {
  ReviewContainer,
  ReviewHeader,
  ReviewTitle,
  ReviewDate,
  ReviewContent,
  ImagesGrid,
  ImageContainer,
  ReviewImage,
  VideoButtonContainer,
  VideoButton,
  NoImagesMessage,
  ReviewLayout,
  ImageSection,
  ContentSection,
  SectionTitle,
} from "./ReviewDisplay.styles";
import { FilmIcon } from "@heroicons/react/24/outline";
import { ReviewData } from "../../pages/TesterReviewDetail/TesterReviewDetail.types";

interface ReviewDisplayProps {
  review: ReviewData;
  onVideoClick: () => void;
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({
  review,
  onVideoClick,
}) => {
  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ReviewContainer>
      <ReviewHeader>
        <ReviewTitle>{review.title}</ReviewTitle>
        <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
      </ReviewHeader>

      <ReviewLayout>
        <ImageSection>
          <SectionTitle>이미지</SectionTitle>
          {review.images.length > 0 ? (
            <ImagesGrid imageCount={review.images.length}>
              {review.images.map((image, index) => (
                <ImageContainer key={index}>
                  <ReviewImage src={image} alt={`리뷰 이미지 ${index + 1}`} />
                </ImageContainer>
              ))}
            </ImagesGrid>
          ) : (
            <NoImagesMessage>첨부된 이미지가 없어요</NoImagesMessage>
          )}

          {review.video && (
            <VideoButtonContainer>
              <VideoButton onClick={onVideoClick}>
                <FilmIcon width={20} height={20} />
                동영상 보기
              </VideoButton>
            </VideoButtonContainer>
          )}
        </ImageSection>

        <ContentSection>
          <SectionTitle>리뷰</SectionTitle>
          <ReviewContent>{review.content}</ReviewContent>
        </ContentSection>
      </ReviewLayout>
    </ReviewContainer>
  );
};

export default ReviewDisplay;
