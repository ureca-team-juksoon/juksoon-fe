export interface FeedCardProps {
  id: number;
  title: string;
  expiredAt: string;
  author: string;
  price: number;
  status: "UPCOMING" | "OPEN" | "CLOSED" ;
  logoImageURL: string;
  registeredUser: number;
  maxUser: number;
  searchQuery?: string;
  isInMyPage?: boolean;
  isOwnerView?: boolean;
}
