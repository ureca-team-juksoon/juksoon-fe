import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import {CategoryType, SortType} from "../../components/CategoryFilter/CategoryFilter.types";
import FeedCard from "../../components/FeedCard/FeedCard";
import { HomeContainer, HomeWrapper, FeedGrid } from "./Home.styles";
import EmptyState from "../../components/EmptyState/EmptyState";
import Pagination   from "../../components/Pagination/Pagination.tsx";
import axios from "../../utils/axios";

const Home: React.FC = () => {
  const [page, setPages] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const [sortType, setSortType] = useState<SortType>("RECENT");
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [feeds, setFeeds] = useState([]);

  const changeFeeds = () => {
      axios.get("/feed", {
          params : {
              page : page,
              category : activeCategory,
              sortType : sortType,
              isAvailable : showAllFeeds}
      }).then((response) => {
          setFeeds(response.data.data.feedList);
          setMaxPage(response.data.data.maxPage);
      })  .catch((error) => {
          console.error("피드 데이터를 불러오는 중 오류 발생:", error);
      });
  }

  // 로그인 사용자 정보 및 피드 데이터 로드
  useEffect(() => {

   // 로그인 사용자 역할 가져오기
   const role = localStorage.getItem("role");
   setUserRole(role);
   changeFeeds();

  //   // 최초 피드 목록 API 요청
  //   axios
  //       .get("/feed")
  // .then((response) => {
  //     console.log(response.data.data.feedList)
  //     setFeeds(response.data.data.feedList);
  //   })
  //       .catch((error) => {
  //         console.error("피드 데이터를 불러오는 중 오류 발생:", error);
  //       });
  }, [sortType, activeCategory, showAllFeeds, page]) ;


  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredFeeds = () => {
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
    // 필터링
    //   if(sortType === "RECENT") {
    //       changeFeeds()
    //
    //   } else if(sortType === "PRICE_ASC"){
    //       changeFeeds()
    //   }
    //
    //   if(showAllFeeds){
    //       changeFeeds()
    //   }
    //
    //   if(activeCategory) {
    //       changeFeeds()
    //   }
    return filtered;
  };

  const handleFilterChange = (showAll: boolean) => {
    setShowAllFeeds(showAll);
  };

  const handleSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  const handleCategoryChange = (category: CategoryType | null) => {
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
              filterLabel="신청 가능한 이벤트"
              showAllFeeds={showAllFeeds}
          />
          {feeds.length > 0 ? (
              <>
              <FeedGrid>
                {feeds.map((feed) => (
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
              <Pagination
                  currentPage={page}
                  maxPage={maxPage}
                  onPageChange={(page) => setPages(page)}
                  />
              </>
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