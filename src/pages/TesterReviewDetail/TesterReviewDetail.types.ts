// 리뷰 데이터 타입
export interface ReviewData {
  feedId: number;
  // User ID
  title: string;
  content: string;
  images: string[];
  video?: string;
  createdAt: string;
}
