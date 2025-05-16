import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { FeedData } from "../../data/feedData";
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
import axios from "../../utils/axios.ts";

const FeedDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feed, setFeed] =useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingSec, setRemainingSec] = useState(0);
  const [buttonActive, setButtonActive] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showTesterModal, setShowTesterModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reservation, setReservation] = useState(false);


  useEffect(() => {
    const storedUserRole = localStorage.getItem("role");
    setUserRole(storedUserRole);

    // 피드 정보 요청하기
    const  feedData = async () => {
      try {
        const feedId = parseInt(id!, 10); // 반드시 숫자로 변환
        console.log(id);
        const res = await axios.get(`/feed/${feedId}`);
        console.log(res.data.data)
        setFeed(res.data.data);

      }  catch (error) {
        console.log ("😥 피드 이벤트 상세 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    void feedData();
    },  [id, navigate]);

  useEffect(() => {
    if (!feed?.startAt) return;

    const targetTime = (() => {
        const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
           if (dateOnlyPattern.test(feed.startAt)) {
              const [year, month, day] = feed.startAt.split('-').map(Number);
              // new Date(year, monthIndex, day) is local midnight
                   return new Date(year, month - 1, day).getTime();
           }
          // otherwise include any time component
               return new Date(feed.startAt).getTime();
        })();

    console.log(targetTime);

    const updateRemaining = () => {
      const diff = Math.max(Math.floor((targetTime - Date.now()) / 1000), 0);
      setRemainingSec(diff);
      console.log(diff);

      // 남은 시간이 0이 되면 버튼 활성화
      if (diff === 0) {
        setButtonActive(true);
      }
    };

    // 1) 즉시 한 번 실행해서 초기 남은 시간을 세팅
    updateRemaining();

    // 2) 이후 1초마다 실행
    const timerId = setInterval(updateRemaining, 1000);
    return () => clearInterval(timerId);
  }, [feed?.startAt]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    console.log(h, m, s);
    // 시는 2자리, 분초도 2자리로 패딩
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleApplyClick = async () => {

    if (!buttonActive || feed?.status === "CLOSED" ) return;

    if (userRole === "ROLE_OWNER") {
      setShowOwnerModal(true);
    } else {

      // 예약 신청로직
      try {
        const response = await axios.post(`/reservation`, {
          "feedId": feed.id
        });
        console.log(response.data);
        const { success } = response.data.data;

        // 이미 신청된 예약건일때 모달 추가

        if (success) {
          setReservation(true); // 예약 성공
          setShowTesterModal(true);
        } else {
          console.error("예약 실패", response.data);
          setShowTesterModal(true); // 실패해도 모달은 표시
        }
      } catch (error) {
        console.error("예약 신청 중 에러 발생:", error);
         // 추후 에러 발생 모달도 추가
      }

      // if (feed) {
      //   const updatedFeed = {
      //     ...feed,
      //     participationCount: feed.registeredUser + 1,
      //   };
      //   if (updatedFeed. >= updatedFeed.maxUser) {
      //     updatedFeed.status = "CLOSED";
      //   }
      //   setFeed(updatedFeed);
      // }
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
    if (imageUrls.length <= 1) return;
    setCurrentImageIndex(prev =>
        prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (imageUrls.length <= 1) return;
    setCurrentImageIndex(prev =>
        prev === imageUrls.length - 1 ? 0 : prev + 1
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

  const imageUrls: string[] = feed.imageUrlList ?? [];
  const placeholder = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000";
  const currentSrc = imageUrls[currentImageIndex] ?? placeholder;
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
              <FeedImage src={currentSrc} alt={feed.title} />
              {imageUrls.length > 1 && (
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
            {feed.videoUrl && (
                <ApplyButton $active={true} onClick={() => setShowVideoModal(true)} style={{ marginTop: '1rem' }}>
                  동영상 보기
                </ApplyButton>
            )}
            <ParticipantsInfo>
              현재 참여 인원: <p>{feed.registeredUser}</p>/
              {feed.maxUser}명
            </ParticipantsInfo>
          </FeedImageSection>

          <FeedDetailsSection>
            <DetailRow>
              <DetailLabel>장소</DetailLabel>
              <DetailValue>{feed.storeName}</DetailValue>
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
              <DetailLabel>이벤트 시작일</DetailLabel>
              <DetailValue>{feed.startAt}</DetailValue>
            </DetailRow>
            <DetailRow className="last-row">
              <DetailLabel>리뷰 요청사항</DetailLabel>
              <DetailValue>👉🏻 {feed.title} </DetailValue>
            </DetailRow>

            <FeedContent>
              {feed.content}
            </FeedContent>

            <ApplyButton
                $active={buttonActive && feed.status === "UPCOMING"}
                onClick={handleApplyClick}
            >
              {feed.status === "CLOSED"
                  ? "마감된 이벤트에요"
                      : buttonActive
                          ? "리뷰단 신청하기!"
                          : "신청 준비 중이에요"}
            </ApplyButton>

            {remainingSec !== null &&
                remainingSec > 0 &&
                feed.status === "UPCOMING" && (
                    <CountdownTimer>
                      신청까지 남은 시간:{" "}
                      {formatTime(remainingSec)}
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

        {showTesterModal && reservation && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>신청 완료!</ModalTitle>
              <ModalText>당첨 결과를 기다려주세요</ModalText>
              <ModalButton onClick={handleCloseModal}>확인</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}

        {showTesterModal && (
            <ModalOverlay onClick={handleCloseModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>신청 실패!</ModalTitle>
                <ModalText>다시 신청해주세요</ModalText>
                <ModalButton onClick={handleCloseModal}>확인</ModalButton>
              </ModalContent>
            </ModalOverlay>
        )}

        {feed.videoUrl && showVideoModal && (
            <ModalOverlay onClick={() => setShowVideoModal(false)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                <ModalTitle>Clip</ModalTitle>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                      src={feed.videoUrl}
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top:0, left:0, width:'100%', height:'100%' }}
                  />
                </div>
                <ModalButton onClick={() => setShowVideoModal(false)}>닫기</ModalButton>
              </ModalContent>
            </ModalOverlay>
        )}
      </FeedDetailContainer>
    </FeedDetailWrapper>
  );
};

export default FeedDetail;
