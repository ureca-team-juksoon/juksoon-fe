import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #5c8f52;
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  margin: 0 2rem;

  @media (max-width: 768px) {
    max-width: none;
    margin: 0 1rem;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export const SearchForm = styled.form`
  width: 100%;
  position: relative;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  padding-left: 40px;
  border-radius: 24px;
  border: 1px solid #eaeaea;
  outline: none;
  background-color: #f5f5f5;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: #5c8f52;
    box-shadow: 0 0 0 2px rgba(92, 143, 82, 0.2);
    background-color: #fff;
  }
`;

export const SearchIconWrapper = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #5c8f52;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a7a42;
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #5c8f52;
  font-weight: 600;

  &:hover {
    color: #4a7a42;
  }
`;
