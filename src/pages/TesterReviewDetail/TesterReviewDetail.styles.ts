import styled from "styled-components";

export const ReviewSection = styled.section`
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
`;

export const ActionButton = styled.button`
  background-color: #5c8f52;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #4a7a42;
  }
`;
