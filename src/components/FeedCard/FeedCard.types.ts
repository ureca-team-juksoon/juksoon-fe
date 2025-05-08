export interface FeedCardProps {
  id: number;
  title: string;
  publishDate: string;
  author: string;
  price: number;
  status: "open" | "closed";
  thumbnail?: string;
  participationCount: number;
  maxParticipants: number;
  searchQuery?: string;
  isInMyPage?: boolean;
  isOwnerView?: boolean;
}
