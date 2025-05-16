export interface FeedData {
  id: number;
  title: string;
  content: string;
  images: string[];
  category: "디저트" | "한식" | "양식" | "중식" | "일식" | "분식";
  maxUser: number;
  registeredUser: number;
  expiredAt: string;
  storeName: string;
  price: number;
  status: "UPCOMING" | "OPEN" | "CLOSED";
  startAt?: string;
  startNow?: boolean;
}

export const feedData: FeedData[] = [
];
