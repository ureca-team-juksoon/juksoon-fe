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
import EmptyState from "../../components/EmptyState/EmptyState";
import { PencilSquareIcon, PlusIcon, MapPinIcon } from "@heroicons/react/24/outline";
import axios from "../../utils/axios";

interface FeedResponse {
  feedId: number,
  title: string,
  price: number,
  maxUser: number,
  registeredUser: number,
  startAt: string,
  expiredAt: string,
  status:  "UPCOMING" | "OPEN" | "CLOSED" ,
  logoImageURL: string;
}

interface StoreResponse {
  name: string,
  address: string,
  description: string,
  logoImageURL: string
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [storeInfo, setStoreInfo] = useState<StoreResponse | null>(null);
  const [feeds, setFeeds] = useState<FeedResponse[]>([]);
  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const [sortType, setSortType] = useState<SortType>("마감일순");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 사용자 닉네임 가져오기
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {

    const loadData = async () => {
      try {
        const res = await axios.get("/feed/mypage");
        const data: StoreResponse = res.data.data;
        setUserRole(data.role);
        setFeeds(data.feedList);

        if(data.role  == "ROLE_OWNER"){
          const storeRes = await axios.get("/store");
          console.log(" [/store] response ▶", storeRes.data.data);
          setStoreInfo(storeRes.data.data);
        }
      } catch (error) {
        console.error("마이페이지 로딩 오류:", error);
      }
    };

    loadData();
  }, []);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleEditStoreInfo = () => navigate("/store/edit");


  const handleAddFeed = () => navigate("/feed/create");

  const filteredFeeds = useMemo(() => {
    let filtered = feeds;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
          (feed) =>
              feed.title.toLowerCase().includes(q) ||
              feed.status.toLowerCase().includes(q)
      );
    }

    if (sortType === "마감일순") {
      filtered.sort(
          (a, b) => new Date(a.expiredAt).getTime() - new Date(b.expiredAt).getTime()
      );
    } else if (sortType === "가격순") {
      filtered.sort((a, b) => a.price- b.price);
    }

    return filtered;
  }, [feeds, searchQuery, showAllFeeds, sortType]);


  return (
      <MyPageWrapper>
        <Header onSearch={handleSearch} />
        <MyPageContainer>
          {userRole === "ROLE_OWNER" ? (
              <>
                <OwnerInfoSection>
                  <StoreInfoContainer>
                    <LogoContainer>
                      <StoreLogo
                          src={
                            storeInfo?.logoImageURL && storeInfo.logoImageURL.trim() !== ""
                                ? storeInfo.logoImageURL
                                : "https://placehold.co/100x100?text=LOGO"
                          }
                          alt="가게 로고"
                      />
                    </LogoContainer>
                    <StoreDetails>
                      <StoreName>{storeInfo?.name}</StoreName>
                      <StoreAddress>
                        <MapPinIcon width={16} height={16} /> {storeInfo?. address}
                      </StoreAddress>
                      <StoreDescription>{storeInfo?. description}</StoreDescription>
                    </StoreDetails>
                  </StoreInfoContainer>
                  <EditButtonsContainer>
                    <EditButton onClick={handleEditStoreInfo}>
                      <PencilSquareIcon width={18} height={18} /> 가게 정보 수정
                    </EditButton>
                  </EditButtonsContainer>
                </OwnerInfoSection>

                <FeedsSection>
                  <SectionHeader>
                    <Title>
                      <p>{storeInfo?.name}</p>님의 피드
                    </Title>
                    <ActionButtonsContainer>
                      <ActionButton onClick={handleAddFeed}>
                        <PlusIcon width={18} height={18} /> 피드 추가
                      </ActionButton>
                    </ActionButtonsContainer>
                  </SectionHeader>
                  {filteredFeeds.length > 0 ? (
                      <FeedGrid>
                        {filteredFeeds.map((feed) => (
                            <FeedCard
                                key={feed.feedId}
                                id={feed.feedId}
                                title={feed.title}
                                author={storeInfo?.name || ""}
                                price={feed.price}
                                status={feed.status}
                                logoImageURL={feed.logoImageURL}
                                registeredUser={feed.registeredUser}
                                maxUser={feed.maxUser}
                                searchQuery={searchQuery}
                                isInMyPage={true}
                                isOwnerView={
                                    userRole === "ROLE_OWNER"
                                }
                                expiredAt={feed.expiredAt}
                            />
                        ))}
                      </FeedGrid>
                  ) : searchQuery ? (
                      <EmptyState type="search" searchQuery={searchQuery} />
                  ) : (
                      <EmptyState type="noOwnFeeds" />
                  )}
                </FeedsSection>
              </>
          ) : (
              <>
                <MyPageTitle>
                  <p>{nickname}</p>님이 신청한 이벤트
                </MyPageTitle>
                <CategoryFilter
                    onFilterChange={setShowAllFeeds}
                    onSortChange={setSortType}
                    onCategoryChange={setActiveCategory}
                    filterLabel="모든 이벤트 보기"
                    showAllFeeds={showAllFeeds}
                />
                {filteredFeeds.length > 0 ? (
                    <FeedGrid>
                      {filteredFeeds.map((feed) => (
                          <FeedCard
                              key={feed.feedId}
                              id={feed.feedId}
                              title={feed.title}
                              author={storeInfo?.name || ""}
                              price={feed.price}
                              status={feed.status}
                              logoImageURL={feed.logoImageURL}
                              registeredUser={feed.registeredUser}
                              maxUser={feed.maxUser}
                              searchQuery={searchQuery}
                              isInMyPage={true}
                              isOwnerView={
                                  userRole === "ROLE_OWNER"
                              }
                              expiredAt={feed.expiredAt}
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
