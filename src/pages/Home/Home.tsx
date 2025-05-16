import React, { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header/Header";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { SortType } from "../../components/CategoryFilter/CategoryFilter.types";
import FeedCard from "../../components/FeedCard/FeedCard";
import { HomeContainer, HomeWrapper, FeedGrid } from "./Home.styles";
// import { feedData as initialFeedData } from "../../data/feedData";
import EmptyState from "../../components/EmptyState/EmptyState";
import axios from "../../utils/axios";

const Home: React.FC = () => {
  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const [sortType, setSortType] = useState<SortType>("마감일순");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [feeds, setFeeds] = useState([]);

  // 로그인 사용자 정보 및 피드 데이터 로드
  useEffect(() => {

    // 로그인 사용자 역할 가져오기
        // const user = await axios.get("/login");
        // localStorage.setItem("role", user.data.data.userRole);
        // localStorage.setItem("nickname", user.data.data.nickname);
        const role = localStorage.getItem("role");
        setUserRole(role);

      // const storedUserRole = localStorage.getItem("role");
    //  setUserRole(user.data.data.userRole);


    // 피드 목록 API 요청
    axios
        .get("/feed", {
          params: {
            page: 0,
            size: 10,
            sortType: "RECENT"
  },
  })
  .then((response) => {
      console.log(response.data.data.feedList)
      setFeeds(response.data.data.feedList);
    })
        .catch((error) => {
          console.error("피드 데이터를 불러오는 중 오류 발생:", error);
        });
  }, []) ;


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
              feed.storeName.toLowerCase().includes(query) ||
              feed.price.toString().includes(query) ||
              (feed.status && feed.status.toLowerCase().includes(query))
      );

    }

    if (!showAllFeeds) {
      filtered = filtered.filter((feed) => feed.status === "UPCOMING");
    }

    if (sortType === "마감일순") {
      filtered.sort(
          (a, b) =>
              new Date(a.expiredAt).getTime() - new Date(b.expiredAt).getTime()
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
                        id={feed.feedId}
                        title={feed.title}
                        expiredAt={feed.expiredAt}
                        author={feed.storeName} // ✅ storeName이 곧 author
                        price={feed.price}
                        status={feed.status}
                        logoImageURL={feed.logoImageURL} // 썸네일 없으면 빈 문자열 or 기본 이미지 처리
                        registeredUser={feed.registeredUser} // ✅
                        maxUser={feed.maxUser} // ✅
                        searchQuery={searchQuery}
                        isInMyPage={false}
                        isOwnerView={
                            userRole === "ROLE_OWNER"
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