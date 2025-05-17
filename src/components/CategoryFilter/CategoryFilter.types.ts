export type SortType = "RECENT" | "PRICE_ASC";
export type CategoryType = "KOREAN" | "JAPANESE" | "WESTERN" | "CHINESE" | "BUNSIK" | "DESSERT";

export interface CategoryFilterProps {
  onFilterChange: (showAvailableOnly: boolean) => void;
  onSortChange: (sortType: SortType) => void;
  onCategoryChange: (category: CategoryType | null) => void;
  filterLabel?: string;
  showAllFeeds?: boolean;
}
