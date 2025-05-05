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
} from "./EventCard.styles";
import { EventCardProps } from "./EventCard.types";

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

const EventCard: React.FC<EventCardProps> = ({
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
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event/${id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <ThumbnailContainer>
        <Thumbnail
          src={thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
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

export default EventCard;
