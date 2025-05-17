import React, { useState } from "react";
import {
  FilterContainer,
  SortButton,
  FilterButton,
  CategoryTag,
} from "./CategoryFilter.styles";
import { SortType, CategoryFilterProps } from "./CategoryFilter.types";

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onFilterChange,
  onSortChange,
  onCategoryChange,
  filterLabel = "신청 가능한 이벤트",
  showAllFeeds = false,
}) => {
  const [activeSort, setActiveSort] = useState<SortType>("RECENT");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSortChange = (sort: SortType) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <>
      <FilterContainer>
        <SortButton
          $active={activeSort === "RECENT"}
          onClick={() => handleSortChange("RECENT")}
        >
          최신순
        </SortButton>
        <SortButton
          $active={activeSort === "PRICE_ASC"}
          onClick={() => handleSortChange("PRICE_ASC")}
        >
          가격순
        </SortButton>
        <FilterButton
          $active={showAllFeeds}
          onClick={() => onFilterChange(!showAllFeeds)}
        >
          {filterLabel}
        </FilterButton>
      </FilterContainer>

      <FilterContainer>
        <CategoryTag
          $active={activeCategory === "디저트"}
          onClick={() => handleCategoryChange("디저트")}
        >
          # 디저트
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "한식"}
          onClick={() => handleCategoryChange("한식")}
        >
          # 한식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "양식"}
          onClick={() => handleCategoryChange("양식")}
        >
          # 양식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "중식"}
          onClick={() => handleCategoryChange("중식")}
        >
          # 중식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "일식"}
          onClick={() => handleCategoryChange("일식")}
        >
          # 일식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "분식"}
          onClick={() => handleCategoryChange("분식")}
        >
          # 분식
        </CategoryTag>
      </FilterContainer>
    </>
  );
};

export default CategoryFilter;
