// 리뷰 데이터 타입
export interface ReviewData {
  feedId: number;
  // User ID
  title: string;
  writer?:string;
  content: string;
  images: (string | File)[];
  video?: string;
  createdAt: string;
}
