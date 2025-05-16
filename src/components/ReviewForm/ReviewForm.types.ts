import { ReviewData } from "../../../../../Users/stl99/바탕 화면/temp/pages/TesterReviewDetail/TesterReviewDetail.types";

export interface ReviewFormProps {
  initialData?: ReviewData | null;
  onSubmit: (reviewData: ReviewData) => void;
}
