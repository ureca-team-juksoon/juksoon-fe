import React, {useState, useEffect, useMemo} from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import VideoModal from "../../components/VideoModal/VideoModal";
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
import axios from "../../utils/axios.ts";

const TesterReviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const feedId = id ? parseInt(id) : 0;

  const [feed, setFeed] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [review, setReview] = useState<ReviewData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // 이벤트 데이터와 리뷰 데이터 로드
  useEffect(() => {


    const fetchData = async () => {
      try {
        const feedId = parseInt(id!, 10);
        const [feedRes, reviewRes] = await Promise.all([
          axios.get(`/feed/${feedId}`),
          axios.get(`/feeds/review/${feedId}`),
        ]);

        setFeed(feedRes.data.data);
        if(reviewRes.data.data.reviews.length!=0) {
          setReview({
            ...reviewRes.data.data.reviews[0],
            images: reviewRes.data.data.reviews[0].imageUrls ?? [],
            video: reviewRes.data.data.reviews[0].video ?? null,
          });
        }
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      } finally {
        // ✅ 무조건 마지막에 로딩 false
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [id]);

  const feedImages = useMemo(() => {
    if (!feed) return [];

    // imageUrlList가 있으면 사용, 없으면 기본 이미지 배열 사용
    if (feed.imageUrlList && feed.imageUrlList.length > 0) {
      return feed.imageUrlList;
    }

    return [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
    ];
  }, [feed]);


  const handlePrevImage = () => {
    if (feedImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? feedImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (feedImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === feedImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenReviewForm = () => {
    setIsWritingReview(true);
  };

  const handleReviewSubmit = async (reviewData: ReviewData) => {
    // 여기는 폼 데이터 형식으로 제출!!

    try {
      const payload = new FormData();
      payload.append("feedId", String(feedId));
      reviewData.images.forEach((file) => {
        payload.append("images", file);
      });
      payload.append("title", reviewData.title);
      payload.append("content", reviewData.content);

      if (reviewData.video) {
        payload.append("video", reviewData.video); // 파일 객체
      }

      if (review) {
        // 수정일 경우
        await axios.patch(`/feeds/review/${feedId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("💕 리뷰가 수정되었습니다!");
      } else {
        // 새로 작성할 경우
        await axios.post(`/feeds/review/${feedId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("💕 리뷰가 등록되었습니다!");
      }

      // 작성 후 다시 불러오기
      const res = await axios.get(`/feeds/review/${feedId}`);
      setReview({
        ...res.data.data.reviews[0],
        images: res.data.data.reviews[0].imageUrls ?? [],
        video: res.data.data.reviews[0].video ?? null,
      })
      setIsWritingReview(false);
    } catch (error) {
      console.error("리뷰 제출 실패", error);
    }

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
          {feed.status === "CLOSED" ? "마감" : "모집중"}
        </StatusTag>

        <FeedContentLayout>
          <FeedImageSection>
            <ImageNavigationContainer>
              <FeedImage
                src={
                    feedImages[currentImageIndex] ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={feed.title}
              />
              {feedImages.length > 1 && (
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
              현재 참여 인원: <p>{feed.registeredUser}</p>/
              {feed.maxUser}명
            </ParticipantsInfo>
          </FeedImageSection>

          <FeedDetailsSection>
            <DetailRow>
              <DetailLabel>장소</DetailLabel>
              <DetailValue>{feed.address}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>방문일</DetailLabel>
              <DetailValue>{feed.expiredAt}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>가격</DetailLabel>
              <DetailValue>{feed.price.toLocaleString()}원</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>작성자</DetailLabel>
              <DetailValue>{feed.storeName}</DetailValue>
            </DetailRow>
            <DetailRow className="last-row">
              <DetailLabel>리뷰 요청사항</DetailLabel>
              <DetailValue>👉🏻 {feed.title}!</DetailValue>
            </DetailRow>

            <FeedContent>
              {feed.content}
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
