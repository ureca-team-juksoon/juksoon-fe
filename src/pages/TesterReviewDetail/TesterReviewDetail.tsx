import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import VideoModal from "../../components/VideoModal/VideoModal";
import { feedData, FeedData } from "../../data/feedData";
import {
  FeedDetailWrapper,
  FeedDetailContainer,
  FeedTitle,
  FeedContentLayout,
  FeedImageSection,
  FeedImage,
  ImageNavigationContainer,
  FeedImageNavigation,
  NavigationButton,
  FeedDetailsSection,
  DetailRow,
  DetailLabel,
  DetailValue,
  FeedContent,
  ParticipantsInfo,
  StatusTag,
} from "../FeedDetail/FeedDetail.styles";
import { ReviewSection, ActionButton } from "./TesterReviewDetail.styles";
import { ReviewData } from "./TesterReviewDetail.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TesterReviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const feedId = id ? parseInt(id) : 0;

  const [feed, setFeed] = useState<FeedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [review, setReview] = useState<ReviewData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // 이벤트 데이터와 리뷰 데이터 로드
  useEffect(() => {
    if (feedId) {
      // 이벤트 데이터 로드
      const foundFeed = feedData.find((e) => e.id === feedId);
      if (foundFeed) {
        setFeed(foundFeed);
      }

      // 로컬 스토리지에서 리뷰 데이터 로드
      const storedReviews = JSON.parse(
        localStorage.getItem("feedReviews") || "{}"
      );
      if (storedReviews[feedId]) {
        setReview(storedReviews[feedId]);
      }

      setIsLoading(false);
    }
  }, [feedId]);

  const dummyImages = feed?.thumbnail
    ? [
        feed.thumbnail,
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
        "https://images.unsplash.com/photo-1620171449638-8154348fda11?q=80&w=1000",
      ]
    : [];

  const handlePrevImage = () => {
    if (dummyImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? dummyImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (dummyImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === dummyImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenReviewForm = () => {
    setIsWritingReview(true);
  };

  const handleReviewSubmit = (reviewData: ReviewData) => {
    // 리뷰 저장
    const newReview = {
      ...reviewData,
      feedId,
      createdAt: new Date().toISOString(),
    };
    setReview(newReview);

    // 로컬 스토리지에 저장
    const storedReviews = JSON.parse(
      localStorage.getItem("feedReviews") || "{}"
    );
    storedReviews[feedId] = newReview;
    localStorage.setItem("feedReviews", JSON.stringify(storedReviews));

    setIsWritingReview(false);
  };

  const handleEditReview = () => {
    setIsWritingReview(true);
  };

  const handleOpenVideoModal = () => {
    if (review?.video) {
      setShowVideoModal(true);
    }
  };

  if (isLoading || !feed) {
    return (
      <FeedDetailWrapper>
        <Header />
        <FeedDetailContainer>
          <p>로딩 중...</p>
        </FeedDetailContainer>
      </FeedDetailWrapper>
    );
  }

  return (
    <FeedDetailWrapper>
      <Header />
      <FeedDetailContainer>
        <FeedTitle>{feed.title}</FeedTitle>
        <StatusTag $status={feed.status}>
          {feed.status === "open" ? "모집중" : "마감"}
        </StatusTag>

        <FeedContentLayout>
          <FeedImageSection>
            <ImageNavigationContainer>
              <FeedImage
                src={
                  dummyImages[currentImageIndex] ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={feed.title}
              />
              {dummyImages.length > 1 && (
                <FeedImageNavigation>
                  <NavigationButton onClick={handlePrevImage}>
                    <ChevronLeftIcon width={24} height={24} />
                  </NavigationButton>
                  <NavigationButton onClick={handleNextImage}>
                    <ChevronRightIcon width={24} height={24} />
                  </NavigationButton>
                </FeedImageNavigation>
              )}
            </ImageNavigationContainer>
            <ParticipantsInfo>
              현재 참여 인원: <p>{feed.participationCount}</p>/
              {feed.maxParticipants}명
            </ParticipantsInfo>
          </FeedImageSection>

          <FeedDetailsSection>
            <DetailRow>
              <DetailLabel>장소</DetailLabel>
              <DetailValue>{feed.author}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>방문일</DetailLabel>
              <DetailValue>{feed.publishDate}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>가격</DetailLabel>
              <DetailValue>{feed.price.toLocaleString()}원</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>작성자</DetailLabel>
              <DetailValue>{feed.author}</DetailValue>
            </DetailRow>
            <DetailRow className="last-row">
              <DetailLabel>리뷰 요청사항</DetailLabel>
              <DetailValue>👉🏻 {feed.author} 단골손님을 찾습니다!!</DetailValue>
            </DetailRow>

            <FeedContent>
              제가 카페는 처음이라 빽다방 단골 지점이랑 맛이 동일한지 좀
              확인해보고 싶어요. 혹시 평소에 빽다방 자주 드시는 손님을
              찾으신다면 오셔서 솔직 리뷰 부탁드립니다! ✓ 방문 시간 자유롭게
              조율 가능! ✓ 전메뉴 시식 가능
            </FeedContent>
          </FeedDetailsSection>
        </FeedContentLayout>

        <ReviewSection>
          {!isWritingReview && !review && (
            <ActionButton onClick={handleOpenReviewForm}>
              리뷰 작성하기
            </ActionButton>
          )}

          {isWritingReview && (
            <ReviewForm initialData={review} onSubmit={handleReviewSubmit} />
          )}

          {!isWritingReview && review && (
            <>
              <ReviewDisplay
                review={review}
                onVideoClick={handleOpenVideoModal}
              />
              <ActionButton onClick={handleEditReview}>
                리뷰 수정하기
              </ActionButton>
            </>
          )}
        </ReviewSection>
      </FeedDetailContainer>

      {showVideoModal && review?.video && (
        <VideoModal
          videoUrl={review.video}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </FeedDetailWrapper>
  );
};

export default TesterReviewDetail;
