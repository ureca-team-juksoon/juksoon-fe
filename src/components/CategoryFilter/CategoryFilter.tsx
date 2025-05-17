import React, { useState } from "react";
import {
  FilterContainer,
  SortButton,
  FilterButton,
  CategoryTag,
} from "./CategoryFilter.styles";
import {SortType, CategoryFilterProps, CategoryType} from "./CategoryFilter.types";

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

  const handleCategoryChange = (category: CategoryType) => {
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
          $active={activeCategory === "DESSERT"}
          onClick={() => handleCategoryChange("DESSERT")}
        >
          # 디저트
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "KOREAN"}
          onClick={() => handleCategoryChange("KOREAN")}
        >
          # 한식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "WESTERN"}
          onClick={() => handleCategoryChange("WESTERN")}
        >
          # 양식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "CHINESE"}
          onClick={() => handleCategoryChange("CHINESE")}
        >
          # 중식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "JAPANESE"}
          onClick={() => handleCategoryChange("JAPANESE")}
        >
          # 일식
        </CategoryTag>
        <CategoryTag
          $active={activeCategory === "BUNSIK"}
          onClick={() => handleCategoryChange("BUNSIK")}
        >
          # 분식
        </CategoryTag>
      </FilterContainer>
    </>
  );
};

export default CategoryFilter;
