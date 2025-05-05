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
}) => {
  const [activeSort, setActiveSort] = useState<SortType>("마감일순");
  const [filterAvailable, setFilterAvailable] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSortChange = (sort: SortType) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const handleFilterChange = () => {
    const newFilterState = !filterAvailable;
    setFilterAvailable(newFilterState);
    onFilterChange(newFilterState);
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
          $active={activeSort === "마감일순"}
          onClick={() => handleSortChange("마감일순")}
        >
          마감일순
        </SortButton>
        <SortButton
          $active={activeSort === "가격순"}
          onClick={() => handleSortChange("가격순")}
        >
          가격순
        </SortButton>
        <FilterButton $active={filterAvailable} onClick={handleFilterChange}>
          신청 가능한 피드만 보기
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
