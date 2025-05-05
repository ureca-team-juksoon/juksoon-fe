import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { eventData, EventData } from "../../data/eventData";
import {
  EventDetailWrapper,
  EventDetailContainer,
  EventTitle,
  EventContentLayout,
  EventImageSection,
  EventImage,
  ImageNavigationContainer,
  EventImageNavigation,
  NavigationButton,
  EventDetailsSection,
  DetailRow,
  DetailLabel,
  DetailValue,
  EventContent,
  ApplyButton,
  CountdownTimer,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButton,
  StatusTag,
  ParticipantsInfo,
} from "./EventDetail.styles";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(10); // 테스트용으로 10초
  const [buttonActive, setButtonActive] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasApplied, setHasApplied] = useState(false);

  const dummyImages = event?.thumbnail
    ? [
        event.thumbnail,
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
        "https://images.unsplash.com/photo-1620171449638-8154348fda11?q=80&w=1000",
      ]
    : [];

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);

    if (id) {
      const eventId = parseInt(id, 10);
      const foundEvent: EventData | undefined = eventData.find(
        (e) => e.id === eventId
      );

      if (foundEvent) {
        setEvent(foundEvent);
        const appliedEvents = JSON.parse(
          localStorage.getItem("appliedEvents") || "[]"
        );
        if (appliedEvents.includes(eventId)) {
          setHasApplied(true);
        }
      } else {
        navigate("/home");
      }
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (event?.status === "closed" || hasApplied) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setButtonActive(true);
    }
  }, [countdown, event?.status, hasApplied]);

  const handleApplyClick = () => {
    if (!buttonActive || event?.status === "closed" || hasApplied) return;

    if (userRole === "owner") {
      setShowOwnerModal(true);
    } else {
      setShowUserModal(true);
      setHasApplied(true);
      const appliedEvents = JSON.parse(
        localStorage.getItem("appliedEvents") || "[]"
      );
      if (!appliedEvents.includes(Number(id))) {
        appliedEvents.push(Number(id));
        localStorage.setItem("appliedEvents", JSON.stringify(appliedEvents));
      }

      if (event) {
        const updatedEvent = {
          ...event,
          participationCount: event.participationCount + 1,
        };
        if (updatedEvent.participationCount >= updatedEvent.maxParticipants) {
          updatedEvent.status = "closed";
        }
        setEvent(updatedEvent);
      }
    }
  };

  const handleCloseModal = () => {
    if (userRole === "owner") {
      setShowOwnerModal(false);
    } else {
      setShowUserModal(false);
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

  if (isLoading || !event) {
    return (
      <EventDetailWrapper>
        <Header />
        <EventDetailContainer>
          <p>로딩 중...</p>
        </EventDetailContainer>
      </EventDetailWrapper>
    );
  }

  return (
    <EventDetailWrapper>
      <Header />
      <EventDetailContainer>
        <EventTitle>{event.title}</EventTitle>
        <StatusTag $status={event.status}>
          {event.status === "open" ? "모집중" : "마감"}
        </StatusTag>

        <EventContentLayout>
          <EventImageSection>
            <ImageNavigationContainer>
              <EventImage
                src={
                  dummyImages[currentImageIndex] ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={event.title}
              />
              {dummyImages.length > 1 && (
                <EventImageNavigation>
                  <NavigationButton onClick={handlePrevImage}>
                    &lt;
                  </NavigationButton>
                  <NavigationButton onClick={handleNextImage}>
                    &gt;
                  </NavigationButton>
                </EventImageNavigation>
              )}
            </ImageNavigationContainer>
            <ParticipantsInfo>
              현재 참여 인원: <p>{event.participationCount}</p>/
              {event.maxParticipants}명
            </ParticipantsInfo>
          </EventImageSection>

          <EventDetailsSection>
            <DetailRow>
              <DetailLabel>장소</DetailLabel>
              <DetailValue>{event.author}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>방문일</DetailLabel>
              <DetailValue>{event.publishDate}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>가격</DetailLabel>
              <DetailValue>{event.price.toLocaleString()}원</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>작성자</DetailLabel>
              <DetailValue>{event.author}</DetailValue>
            </DetailRow>
            <DetailRow className="last-row">
              <DetailLabel>리뷰 요청사항</DetailLabel>
              <DetailValue>👉🏻 {event.author} 단골손님을 찾습니다!!</DetailValue>
            </DetailRow>

            <EventContent>
              제가 카페는 처음이라 빽다방 단골 지점이랑 맛이 동일한지 좀
              확인해보고 싶어요. 혹시 평소에 빽다방 자주 드시는 손님을
              찾으신다면 오셔서 솔직 리뷰 부탁드립니다! ✓ 방문 시간 자유롭게
              조율 가능! ✓ 전메뉴 시식 가능
            </EventContent>

            <ApplyButton
              $active={buttonActive && event.status === "open" && !hasApplied}
              onClick={handleApplyClick}
            >
              {event.status === "closed"
                ? "마감되었습니다"
                : hasApplied
                ? "신청되었습니다"
                : buttonActive
                ? "리뷰단 신청하기"
                : "신청 준비 중"}
            </ApplyButton>

            {!buttonActive && event.status === "open" && !hasApplied && (
              <CountdownTimer>
                신청까지 남은 시간:{" "}
                {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                {String(countdown % 60).padStart(2, "0")}
              </CountdownTimer>
            )}
          </EventDetailsSection>
        </EventContentLayout>

        {showOwnerModal && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>잠깐!</ModalTitle>
              <ModalText>사장님은 신청하실 수 없어요</ModalText>
              <ModalButton onClick={handleCloseModal}>확인</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}

        {showUserModal && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>신청 완료!</ModalTitle>
              <ModalText>당첨 결과를 기다려주세요</ModalText>
              <ModalButton onClick={handleCloseModal}>확인</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </EventDetailContainer>
    </EventDetailWrapper>
  );
};

export default EventDetail;
