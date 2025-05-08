import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { SortType } from "../../components/CategoryFilter/CategoryFilter.types";
import FeedCard from "../../components/FeedCard/FeedCard";
import {
  MyPageContainer,
  MyPageWrapper,
  FeedGrid,
  MyPageTitle,
  Title,
  ActionButtonsContainer,
  ActionButton,
  OwnerInfoSection,
  StoreInfoContainer,
  StoreDetails,
  StoreName,
  StoreAddress,
  StoreDescription,
  LogoContainer,
  StoreLogo,
  EditButtonsContainer,
  EditButton,
  FeedsSection,
  SectionHeader,
} from "./MyPage.styles";
import { feedData, FeedData } from "../../data/feedData";
import EmptyState from "../../components/EmptyState/EmptyState";
import {
  PencilSquareIcon,
  PlusIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const mockStoreInfo = {
  name: "가게 이름을 입력해주세요",
  address: "주소를 입력해주세요",
  description: "가게에 대한 설명을 입력해주세요",
  logo: "https://placehold.co/150?text=JUKSOON+Logo",
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedFeeds, setAppliedFeeds] = useState<number[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [storeInfo, setStoreInfo] = useState(mockStoreInfo);
  const [feeds, setFeeds] = useState<FeedData[]>([]);

  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const [sortType, setSortType] = useState<SortType>("마감일순");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);

    const storedStoreInfo = localStorage.getItem("storeInfo");
    if (storedStoreInfo) {
      setStoreInfo(JSON.parse(storedStoreInfo));
    }

    const storedFeeds = localStorage.getItem("feedData");
    if (storedFeeds) {
      setFeeds(JSON.parse(storedFeeds));
    } else {
      setFeeds(feedData);
    }

    const storedAppliedFeeds = JSON.parse(
      localStorage.getItem("appliedFeeds") || "[]"
    );
    setAppliedFeeds(storedAppliedFeeds);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleEditStoreInfo = () => {
    navigate("/store/edit");
  };

  const handleAddFeed = () => {
    navigate("/feed/create");
  };

  const filteredFeeds = useMemo(() => {
    let filtered;

    if (userRole === "ROLE_OWNER") {
      filtered = feeds.filter((feed) => feed.author === storeInfo.name);
    } else {
      filtered = feeds.filter((feed) => appliedFeeds.includes(feed.id));
    }

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
      // filtered = filtered.filter(feed => feed.category === activeCategory);
    }

    return filtered;
  }, [
    feeds,
    appliedFeeds,
    searchQuery,
    showAllFeeds,
    sortType,
    activeCategory,
    userRole,
    storeInfo.name,
  ]);

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
    <MyPageWrapper>
      <Header onSearch={handleSearch} />
      <MyPageContainer>
        {userRole === "ROLE_OWNER" ? (
          <>
            <OwnerInfoSection>
              <StoreInfoContainer>
                <LogoContainer>
                  <StoreLogo src={storeInfo.logo} alt="가게 로고" />
                </LogoContainer>
                <StoreDetails>
                  <StoreName>{storeInfo.name}</StoreName>
                  <StoreAddress>
                    <MapPinIcon width={16} height={16} />
                    {storeInfo.address}
                  </StoreAddress>
                  <StoreDescription>{storeInfo.description}</StoreDescription>
                </StoreDetails>
              </StoreInfoContainer>
              <EditButtonsContainer>
                <EditButton onClick={handleEditStoreInfo}>
                  <PencilSquareIcon width={18} height={18} />
                  가게 정보 수정
                </EditButton>
              </EditButtonsContainer>
            </OwnerInfoSection>

            <FeedsSection>
              <SectionHeader>
                <Title>
                  <p>밍경</p>님의 피드
                </Title>
                <ActionButtonsContainer>
                  <ActionButton onClick={handleAddFeed}>
                    <PlusIcon width={18} height={18} />
                    피드 추가
                  </ActionButton>
                </ActionButtonsContainer>
              </SectionHeader>

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
                      isInMyPage={true} // 항상 true로 설정하여 명확하게 표시
                      isOwnerView={userRole === "ROLE_OWNER"}
                    />
                  ))}
                </FeedGrid>
              ) : searchQuery ? (
                <EmptyState type="search" searchQuery={searchQuery} />
              ) : userRole === "ROLE_OWNER" ? (
                <EmptyState type="noOwnFeeds" />
              ) : (
                <EmptyState type="noApplied" />
              )}
            </FeedsSection>
          </>
        ) : (
          <>
            {/* 테스터 전용 타이틀 */}
            <MyPageTitle>
              <p>밍경</p>님이 신청한 이벤트
            </MyPageTitle>

            {/* 테스터 역할일 때만 카테고리 필터 표시 */}
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
                    isInMyPage={true} // 항상 true로 설정하여 명확하게 표시
                    isOwnerView={userRole === "ROLE_OWNER"}
                  />
                ))}
              </FeedGrid>
            ) : searchQuery ? (
              <EmptyState type="search" searchQuery={searchQuery} />
            ) : (
              <EmptyState type="noApplied" />
            )}
          </>
        )}
      </MyPageContainer>
    </MyPageWrapper>
  );
};

export default MyPage;
