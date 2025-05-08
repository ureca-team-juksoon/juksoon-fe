import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  SearchContainer,
  SearchForm,
  SearchIconWrapper,
  SearchInput,
  SearchButton,
  Navigation,
  NavLink,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색어 입력 여부와 상관없이 onSearch 함수 호출
    // 이렇게 하면 빈 검색어로 검색해도 전체 카드가 표시됨
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  // 입력값이 변경될 때마다 실시간으로 검색 결과 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // 실시간 검색을 위해 입력 즉시 검색 함수 호출
    if (onSearch) {
      onSearch(value.trim());
    }
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>JUKSOON</Logo>
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchIconWrapper>
            <MagnifyingGlassIcon width={20} height={20} />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <SearchButton type="submit" aria-label="검색">
            <PaperAirplaneIcon width={18} height={18} />
          </SearchButton>
        </SearchForm>
      </SearchContainer>
      <Navigation>
        <NavLink onClick={() => navigate("/home")}>HOME</NavLink>
        <NavLink onClick={() => navigate("/mypage")}>My Page</NavLink>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
