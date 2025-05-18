import React from "react";
import { PaginationWrapper, PageButton } from "./Pagination.styles";

interface Props {
  currentPage: number;
  maxPage: number;
  onPageChange: (page: number) => void;
  groupSize?: number;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  maxPage,
  onPageChange,
  groupSize = 10,
}) => {
  const currentGroup = Math.floor(currentPage / groupSize);
  const startPage = currentGroup * groupSize;
  const endPage = Math.min(startPage + groupSize - 1, maxPage - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <PaginationWrapper>
      <PageButton
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </PageButton>
      ))}

      <PageButton
        disabled={currentPage === maxPage - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
