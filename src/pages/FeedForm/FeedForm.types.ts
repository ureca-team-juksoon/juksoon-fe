export interface FeedFormData {
  id?: number;
  title: string;
  content: string;
  category: string;
  startDate: string;
  startNow: boolean;
  maxParticipants: number;
  visitDate: string;
  images: string[];
  price: number;
  status: "open" | "closed";
  participationCount?: number;
}
