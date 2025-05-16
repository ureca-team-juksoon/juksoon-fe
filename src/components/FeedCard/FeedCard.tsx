import React, { useMemo } from "react";
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
  expiredAt,
  author,
  price,
  status,
  logoImageURL,
  registeredUser,
  maxUser,
  searchQuery = "",
  isInMyPage = false,
  isOwnerView = false,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Owner의 MyPage에서 자신의 피드 클릭 시 Owner 피드 상세 페이지로 이동
    if (isOwnerView && isInMyPage) {
      navigate(`/feed/owner/${id}`);
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

  const thumbnailImage = useMemo(() => {
    if (typeof logoImageURL === "string" && logoImageURL.trim() !== "") {
      return logoImageURL;
    }
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000";
  }, [logoImageURL]);

  return (
    <Card onClick={handleCardClick}>
      <ThumbnailContainer>
        <Thumbnail
          src={thumbnailImage}
          alt={title}
          onError={(e) => {
            console.error(`Image failed to load: ${thumbnailImage}`);
            (e.target as HTMLImageElement).src =
              "https://placehold.co/300x200?text=Error+Loading";
          }}
        />
        <BadgeContainer>
          <StatusBadge $status={status}>
            {status === "CLOSED" ? "마감" : "모집중"}
          </StatusBadge>
        </BadgeContainer>
        <ParticipantBadge>
          {registeredUser}/{maxUser}
        </ParticipantBadge>
      </ThumbnailContainer>
      <CardContent>
        <Title>{highlightText(title, searchQuery)}</Title>
        <PublishDate>방문일: {expiredAt}</PublishDate>
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
