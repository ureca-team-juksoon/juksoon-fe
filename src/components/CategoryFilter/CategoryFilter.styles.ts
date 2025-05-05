import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1.5rem 0;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  border: none;
  background-color: ${(props) => (props.$active ? "#5C8F52" : "#f5f5f5")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-weight: ${(props) => (props.$active ? "500" : "400")};

  &:hover {
    background-color: ${(props) => (props.$active ? "#5C8F52" : "#e9e9e9")};
  }
`;

export const SortButton = styled(FilterButton)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const CategoryTag = styled(FilterButton)`
  border: 1px solid #e0e0e0;
`;
