import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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
import { ActionButton } from "../TesterReviewDetail/TesterReviewDetail.styles";
import { ReviewData } from "../TesterReviewDetail/TesterReviewDetail.types.ts";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import VideoModal from "../../components/VideoModal/VideoModal";
import {
  ActionButtonWrapper,
  ReviewSection,
  ReviewsContainer,
  ReviewTitle,
  NoReviewsMessage,
  ReviewItem,
  EditButton,
  DeleteButton,
  ButtonGroup,
  ConfirmModalOverlay,
  ConfirmModalContent,
  ConfirmModalTitle,
  ConfirmModalText,
  ConfirmModalButtons,
} from "./OwnerFeedDetail.styles";
import axios from "../../utils/axios.ts";

const OwnerFeedDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feed, setFeed] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const feedId = parseInt(id!, 10);
        const [feedRes, reviewRes] = await Promise.all([
          axios.get(`/feed/${feedId}`),
          axios.get(`/feeds/review/${feedId}`),
        ]);

        setFeed(feedRes.data.data);
        const mapped: ReviewData[] = reviewRes.data.data.reviews.map((r) => ({
          title: r.title,
          content: r.content,
          writer: r.writer,
          images: r.imageUrls,     // imageUrls → images
          video: r.videoUrl ?? "",  // videoUrl → video
          createdAt: r.createAt,    // createAt → createdAt
        }));
        setReviews(mapped);
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

  const handleEditClick = () => {
    // 페이지 이동 시 스크롤을 상단으로 이동시키는 코드
    window.scrollTo(0, 0);
    if (id) {
      navigate(`/feed/edit/${id}`);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const feedId = parseInt(id!, 10);

      // ✅ 실제 삭제 요청
      await axios.delete(`/feed/${feedId}`);
      console.log("피드가 성공적으로 삭제되었습니다.");

      // 마이페이지로 이동
      navigate("/mypage");
    } catch (error) {
      console.error("❌ 피드 삭제 실패:", error);
    } finally {
      // ✅ 모달 닫기
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleVideoClick = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
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
              현재 참여 인원: <p>{feed.registeredUser}</p>/{feed.maxUser}명
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
              <DetailValue>✨ {feed.title} </DetailValue>
            </DetailRow>
            <FeedContent>
              {feed.content.split("\n").map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </FeedContent>
          </FeedDetailsSection>
        </FeedContentLayout>

        {/* 수정 및 삭제 버튼 */}
        {feed.status === "UPCOMING" && (
        <ActionButtonWrapper>
          <ButtonGroup>
            <EditButton onClick={handleEditClick}>피드 수정하기</EditButton>
            <DeleteButton onClick={handleDeleteClick}>
              피드 삭제하기
            </DeleteButton>
          </ButtonGroup>
        </ActionButtonWrapper>
        )}

        {/*/!* 신청자 섹션 *!/*/}
        {/*<ApplicantSection>*/}
        {/*  <h3>신청자 목록 ({feed.registeredUser}명)</h3>*/}
        {/*  {feed.registeredUser > 0 ? (*/}
        {/*    <ApplicantList>*/}
        {/*      {applicants.slice(0, feed.registeredUser).map((applicant) => (*/}
        {/*        <ApplicantItem key={applicant.id}>*/}
        {/*          <ApplicantName>{applicant.name}</ApplicantName>*/}
        {/*          <span>{applicant.status}</span>*/}
        {/*        </ApplicantItem>*/}
        {/*      ))}*/}
        {/*    </ApplicantList>*/}
        {/*  ) : (*/}
        {/*    <p>아직 신청자가 없습니다.</p>*/}
        {/*  )}*/}
        {/*</ApplicantSection>*/}

        {/* 테스터 리뷰 섹션 */}
        <ReviewSection>
          <ReviewTitle>테스터 리뷰 ({reviews.length})</ReviewTitle>

          {reviews.length > 0 ? (
            <ReviewsContainer>
              {reviews.map((review, index) => (
                <ReviewItem key={index}>
                  <ReviewDisplay
                    review={review}
                    onVideoClick={() => handleVideoClick(review.video || "")}
                  />
                </ReviewItem>
              ))}
            </ReviewsContainer>
          ) : (
            <NoReviewsMessage>아직 작성된 리뷰가 없습니다.</NoReviewsMessage>
          )}
        </ReviewSection>

        {/* 비디오 모달 */}
        {showVideoModal && currentVideoUrl && (
          <VideoModal
            videoUrl={currentVideoUrl}
            onClose={() => setShowVideoModal(false)}
          />
        )}

        {/* 삭제 확인 모달 */}
        {showDeleteModal && (
          <ConfirmModalOverlay>
            <ConfirmModalContent>
              <ConfirmModalTitle>피드 삭제</ConfirmModalTitle>
              <ConfirmModalText>정말 이 피드를 삭제할까요?</ConfirmModalText>
              <ConfirmModalButtons>
                <DeleteButton onClick={handleConfirmDelete}>삭제</DeleteButton>
                <ActionButton onClick={handleCancelDelete}>취소</ActionButton>
              </ConfirmModalButtons>
            </ConfirmModalContent>
          </ConfirmModalOverlay>
        )}
      </FeedDetailContainer>
    </FeedDetailWrapper>
  );
};

export default OwnerFeedDetail;
