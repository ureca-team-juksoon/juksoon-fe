export interface FeedFormData {
  id?: number;
  title: string;
  content: string;
  category: string;
  startAt: string;
  startNow:  boolean;
  maxUser: number;
  expiredAt: string;
  images?: string[];
  price: number;
  status?: "UPCOMING" | "OPEN" | "CLOSED";
  video: File | null ;
  registeredUser?: number;
}
