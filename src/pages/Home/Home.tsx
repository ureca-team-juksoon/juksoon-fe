import React, { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header/Header";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { SortType } from "../../components/CategoryFilter/CategoryFilter.types";
import FeedCard from "../../components/FeedCard/FeedCard";
import { HomeContainer, HomeWrapper, FeedGrid } from "./Home.styles";
import { feedData as initialFeedData } from "../../data/feedData";
import EmptyState from "../../components/EmptyState/EmptyState";

const Home: React.FC = () => {
  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const [sortType, setSortType] = useState<SortType>("마감일순");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [feeds, setFeeds] = useState(initialFeedData);

  // 로그인 사용자 정보 및 피드 데이터 로드
  useEffect(() => {
    // 로그인 사용자 역할 가져오기
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);

    // localStorage에서 피드 데이터 가져오기
    const storedFeeds = localStorage.getItem("feedData");
    if (storedFeeds) {
      setFeeds(JSON.parse(storedFeeds));
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredFeeds = useMemo(() => {
    let filtered = [...feeds];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (feed) =>
          feed.title.toLowerCase().includes(query) ||
          feed.author.toLowerCase().includes(query) ||
          feed.price.toString().includes(query) ||
          (feed.status && feed.status.toLowerCase().includes(query))
      );
    }

    if (!showAllFeeds) {
      filtered = filtered.filter((feed) => feed.status === "open");
    }

    if (sortType === "마감일순") {
      filtered.sort(
        (a, b) =>
          new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
    } else if (sortType === "가격순") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (activeCategory) {
      // filtered = filtered.filter(
      //   (feed) =>
      //     feed.category &&
      //     feed.category.toLowerCase() === activeCategory.toLowerCase()
      // );
    }

    return filtered;
  }, [feeds, showAllFeeds, sortType, activeCategory, searchQuery]);

  const handleFilterChange = (showAll: boolean) => {
    setShowAllFeeds(showAll);
  };

  const handleSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  // 현재 로그인한 사용자의 정보 가져오기
  const storeInfo = useMemo(() => {
    const storedInfo = localStorage.getItem("storeInfo");
    return storedInfo ? JSON.parse(storedInfo) : { name: "" };
  }, []);

  return (
    <HomeWrapper>
      <Header onSearch={handleSearch} />
      <HomeContainer>
        <CategoryFilter
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
          filterLabel="모든 이벤트 보기"
          showAllFeeds={showAllFeeds}
        />
        {filteredFeeds.length > 0 ? (
          <FeedGrid>
            {filteredFeeds.map((feed) => (
              <FeedCard
                key={feed.id}
                id={feed.id}
                title={feed.title}
                publishDate={feed.publishDate}
                author={feed.author}
                price={feed.price}
                status={feed.status}
                thumbnail={feed.thumbnail}
                participationCount={feed.participationCount}
                maxParticipants={feed.maxParticipants}
                searchQuery={searchQuery}
                isInMyPage={false} // 명시적으로 false 설정
                isOwnerView={
                  userRole === "ROLE_OWNER" && feed.author === storeInfo.name
                }
              />
            ))}
          </FeedGrid>
        ) : searchQuery ? (
          <EmptyState type="search" searchQuery={searchQuery} />
        ) : (
          <EmptyState type="noFeeds" />
        )}
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home;
