import { ReviewData } from "../../pages/TesterReviewDetail/TesterReviewDetail.types";

export interface ReviewFormProps {
  initialData?: ReviewData | null;
  onSubmit: (reviewData: ReviewData) => void;
}
