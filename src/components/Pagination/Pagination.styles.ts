import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${({ active }) => (active ? "#5c8f52" : "#ccc")};
  background-color: ${({ active }) => (active ? "#5c8f52" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ active }) => (active ? "#5c8f52" : "#f5f5f5")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
