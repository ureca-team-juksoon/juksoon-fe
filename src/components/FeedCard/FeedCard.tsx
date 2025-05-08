import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  ThumbnailContainer,
  Thumbnail,
  BadgeContainer,
  StatusBadge,
  ParticipantBadge,
  CardContent,
  Title,
  PublishDate,
  CardFooter,
  Author,
  Price,
  HighlightedText,
} from "./FeedCard.styles";
import { FeedCardProps } from "./FeedCard.types";

const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  try {
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : (
        part
      )
    );
  } catch {
    return text;
  }
};

const FeedCard: React.FC<FeedCardProps> = ({
  id,
  title,
  publishDate,
  author,
  price,
  status,
  thumbnail,
  participationCount,
  maxParticipants,
  searchQuery = "",
  isInMyPage = false,
  isOwnerView = false,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(
      `Card clicked: ID=${id}, isOwnerView=${isOwnerView}, isInMyPage=${isInMyPage}`
    );

    // Owner의 MyPage에서 자신의 피드 클릭 시 수정 페이지로 이동
    if (isOwnerView && isInMyPage) {
      navigate(`/feed/edit/${id}`);
    }
    // 테스터의 MyPage에서 신청한 피드 클릭 시 리뷰 페이지로 이동
    else if (isInMyPage) {
      navigate(`/review/${id}`);
    }
    // 그 외의 모든 경우 상세 페이지로 이동
    else {
      navigate(`/feed/${id}`);
    }
  };

  return (
    <Card onClick={handleCardClick}>
      <ThumbnailContainer>
        <Thumbnail
          src={thumbnail || "https://placehold.co/300x200?text=No+Image"}
          alt={title}
        />
        <BadgeContainer>
          <StatusBadge $status={status}>
            {status === "open" ? "모집중" : "마감"}
          </StatusBadge>
        </BadgeContainer>
        <ParticipantBadge>
          {participationCount}/{maxParticipants}
        </ParticipantBadge>
      </ThumbnailContainer>
      <CardContent>
        <Title>{highlightText(title, searchQuery)}</Title>
        <PublishDate>방문일: {publishDate}</PublishDate>
      </CardContent>
      <CardFooter>
        <Author>by. {highlightText(author, searchQuery)}</Author>
        <Price>
          {price.toString() === searchQuery ? (
            <HighlightedText>{price.toLocaleString()}원</HighlightedText>
          ) : (
            `${price.toLocaleString()}원`
          )}
        </Price>
      </CardFooter>
    </Card>
  );
};

export default FeedCard;
