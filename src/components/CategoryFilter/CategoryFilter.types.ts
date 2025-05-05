export type SortType = "마감일순" | "가격순";

export interface CategoryFilterProps {
  onFilterChange: (showAvailableOnly: boolean) => void;
  onSortChange: (sortType: SortType) => void;
  onCategoryChange: (category: string | null) => void;
}
