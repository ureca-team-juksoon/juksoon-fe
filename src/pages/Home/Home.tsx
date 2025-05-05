import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header/Header";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { SortType } from "../../components/CategoryFilter/CategoryFilter.types";
import EventCard from "../../components/EventCard/EventCard";
import CreateEventButton from "../../components/CreateEventButton";
import { HomeContainer, HomeWrapper, EventGrid } from "./Home.styles";
import { eventData } from "../../data/eventData";

const Home: React.FC = () => {
  // 로컬 스토리지에서 사용자 역할 확인
  const [isOwner, setIsOwner] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortType, setSortType] = useState<SortType>("마감일순");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "owner") {
      setIsOwner(true);
    }
  }, []);

  const handleCreateEvent = () => {
    alert("이벤트 작성 페이지로 이동합니다.");
    // navigate('/events/create');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 검색어가 비어있으면 전체 카드 표시
  };

  const filteredEvents = useMemo(() => {
    let filtered = [...eventData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.author.toLowerCase().includes(query) ||
          // 가격도 문자열로 변환하여 검색 가능하게
          event.price.toString().includes(query) ||
          // 이벤트 상태도 검색 가능하게 함
          (event.status && event.status.toLowerCase().includes(query))
      );
    }

    // 신청 가능한 이벤트만 표시
    if (showAvailableOnly) {
      filtered = filtered.filter((event) => event.status === "open");
    }

    if (sortType === "마감일순") {
      filtered.sort(
        (a, b) =>
          new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
    } else if (sortType === "가격순") {
      filtered.sort((a, b) => a.price - b.price);
    }

    // 카테고리 필터링 (아직 이벤트에 카테고리가 없기 때문에 나중에 구현)
    if (activeCategory) {
      // filtered = filtered.filter(event => event.category === activeCategory);
    }

    return filtered;
  }, [showAvailableOnly, sortType, activeCategory, searchQuery]);

  const handleFilterChange = (available: boolean) => {
    setShowAvailableOnly(available);
  };

  const handleSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <HomeWrapper>
      <Header onSearch={handleSearch} />
      <HomeContainer>
        <CategoryFilter
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
        />
        <EventGrid>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                publishDate={event.publishDate}
                author={event.author}
                price={event.price}
                status={event.status}
                thumbnail={event.thumbnail}
                participationCount={event.participationCount}
                maxParticipants={event.maxParticipants}
                searchQuery={searchQuery}
              />
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                gridColumn: "1 / -1",
                padding: "2rem",
                color: "#666",
              }}
            >
              검색 결과가 없어요
            </div>
          )}
        </EventGrid>

        {isOwner && <CreateEventButton onClick={handleCreateEvent} />}
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home;
