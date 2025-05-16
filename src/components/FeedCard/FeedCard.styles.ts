import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  background-color: #f5f5f5;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 8px;
`;

export const StatusBadge = styled.div<{ $status: "UPCOMING" | "OPEN" | "CLOSED" }>`
  background-color: ${(props) =>
    props.$status === "CLOSED" ?  "#F44336": "#8EB69B" };
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ParticipantBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const CardContent = styled.div`
  padding: 1rem;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
  max-height: 2.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

export const PublishDate = styled.p`
  margin: 0.5rem 0;
  font-size: 0.8rem;
  color: #666;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 1rem;
`;

export const Author = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
`;

export const Price = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
`;

export const HighlightedText = styled.span`
  background-color: rgba(92, 143, 82, 0.3);
  color: #333;
  border-radius: 2px;
  padding: 0 2px;
  font-weight: 700;
`;

export const EditIconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    background-color: white;
  }
`;
