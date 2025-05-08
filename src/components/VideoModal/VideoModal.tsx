import React, { useEffect, useCallback } from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  VideoContainer,
} from "./VideoModal.styles";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = "hidden";

    // ESC 키로 모달 닫기
    document.addEventListener("keydown", handleEscapeKey);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 스크롤 복원
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <XMarkIcon width={24} height={24} />
        </CloseButton>

        <VideoContainer>
          <video
            controls
            autoPlay
            src={videoUrl}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </VideoContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default VideoModal;
