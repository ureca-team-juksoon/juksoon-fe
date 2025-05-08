import { ReviewData } from "../../pages/TesterReviewDetail/TesterReviewDetail.types";

export interface ReviewDisplayProps {
  review: ReviewData;
  onVideoClick: () => void;
}
