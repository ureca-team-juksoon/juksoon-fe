import React from "react";
import {
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateMessage,
  EmptyStateButton,
} from "./EmptyState.styles";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import { EmptyStateProps } from "./EmptyState.types";

const EmptyState: React.FC<EmptyStateProps> = ({ type, searchQuery }) => {
  const navigate = useNavigate();

  const renderContent = () => {
    switch (type) {
      case "search":
        return {
          icon: <MagnifyingGlassIcon width={48} height={48} />,
          title: (
            <>
              "{searchQuery}"에 대한
              <br />
              검색 결과가 없어요
            </>
          ),
          message: "다른 검색어로 다시 시도해보세요!",
          buttonText: "",
          buttonAction: () => {},
        };

      case "noFeeds":
        return {
          icon: <ExclamationCircleIcon width={48} height={48} />,
          title: "현재 진행 중인 이벤트가 없어요",
          message: "나중에 다시 확인해주세요!",
          buttonText: "",
          buttonAction: () => {},
        };

      case "noApplied":
        return {
          icon: <CalendarIcon width={48} height={48} />,
          title: "아직 신청한 이벤트가 없어요",
          message: "다양한 이벤트를 둘러보고 참여해보세요!",
          buttonText: "이벤트 둘러보기",
          buttonAction: () => navigate("/home"),
        };

      case "noOwnFeeds":
        return {
          icon: <DocumentPlusIcon width={48} height={48} />,
          title: "아직 등록된 피드가 없어요",
          message: "새로운 피드를 등록하고 테스터를 모집해보세요!",
          buttonText: "피드 추가하기",
          buttonAction: () => navigate("/feed/create"),
        };
    }
  };

  const content = renderContent();

  return (
    <EmptyStateContainer>
      <EmptyStateIcon>{content.icon}</EmptyStateIcon>
      <EmptyStateTitle>{content.title}</EmptyStateTitle>
      <EmptyStateMessage>{content.message}</EmptyStateMessage>
      {content.buttonText && (
        <EmptyStateButton onClick={content.buttonAction}>
          {content.buttonText}
        </EmptyStateButton>
      )}
    </EmptyStateContainer>
  );
};

export default EmptyState;
