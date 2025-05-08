import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { feedData, FeedData } from "../../data/feedData";
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
  ApplyButton,
  CountdownTimer,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButton,
  StatusTag,
  ParticipantsInfo,
} from "./FeedDetail.styles";

const FeedDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // 테스트용으로 10초
  const [countdown, setCountdown] = useState(10);
  const [buttonActive, setButtonActive] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showTesterModal, setShowTesterModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasApplied, setHasApplied] = useState(false);

  // 더미 이미지 배열 (나중에는 서버에서 받아온 이미지로 대체)
  const dummyImages = feed?.thumbnail
    ? [
        feed.thumbnail,
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
        "https://images.unsplash.com/photo-1620171449638-8154348fda11?q=80&w=1000",
      ]
    : [];

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);

    if (id) {
      const feedId = parseInt(id, 10);
      const foundFeed: FeedData | undefined = feedData.find(
        (e) => e.id === feedId
      );

      if (foundFeed) {
        setFeed(foundFeed);
        const appliedFeeds = JSON.parse(
          localStorage.getItem("appliedFeeds") || "[]"
        );
        if (appliedFeeds.includes(feedId)) {
          setHasApplied(true);
        }
      } else {
        navigate("/home");
      }
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (feed?.status === "closed" || hasApplied) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setButtonActive(true);
    }
  }, [countdown, feed?.status, hasApplied]);

  const handleApplyClick = () => {
    if (!buttonActive || feed?.status === "closed" || hasApplied) return;

    if (userRole === "ROLE_OWNER") {
      setShowOwnerModal(true);
    } else {
      setShowTesterModal(true);
      setHasApplied(true);
      const appliedFeeds = JSON.parse(
        localStorage.getItem("appliedFeeds") || "[]"
      );
      if (!appliedFeeds.includes(Number(id))) {
        appliedFeeds.push(Number(id));
        localStorage.setItem("appliedFeeds", JSON.stringify(appliedFeeds));
      }

      if (feed) {
        const updatedFeed = {
          ...feed,
          participationCount: feed.participationCount + 1,
        };
        if (updatedFeed.participationCount >= updatedFeed.maxParticipants) {
          updatedFeed.status = "closed";
        }
        setFeed(updatedFeed);
      }
    }
  };

  const handleCloseModal = () => {
    if (userRole === "ROLE_OWNER") {
      setShowOwnerModal(false);
    } else {
      setShowTesterModal(false);
    }
  };

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

            <ApplyButton
              $active={buttonActive && feed.status === "open" && !hasApplied}
              onClick={handleApplyClick}
            >
              {feed.status === "closed"
                ? "마감된 이벤트에요"
                : hasApplied
                ? "이미 신청한 이벤트에요"
                : buttonActive
                ? "리뷰단 신청하기!"
                : "신청 준비 중이에요"}
            </ApplyButton>

            {!buttonActive && feed.status === "open" && !hasApplied && (
              <CountdownTimer>
                신청까지 남은 시간:{" "}
                {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                {String(countdown % 60).padStart(2, "0")}
              </CountdownTimer>
            )}
          </FeedDetailsSection>
        </FeedContentLayout>

        {showOwnerModal && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>잠깐!</ModalTitle>
              <ModalText>사장님은 신청하실 수 없어요</ModalText>
              <ModalButton onClick={handleCloseModal}>확인</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}

        {showTesterModal && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>신청 완료!</ModalTitle>
              <ModalText>당첨 결과를 기다려주세요</ModalText>
              <ModalButton onClick={handleCloseModal}>확인</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </FeedDetailContainer>
    </FeedDetailWrapper>
  );
};

export default FeedDetail;
