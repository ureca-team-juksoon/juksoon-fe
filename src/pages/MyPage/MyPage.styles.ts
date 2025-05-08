import styled from "styled-components";

export const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MyPageContainer = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
`;

export const MyPageTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;

  p {
    color: #5c8f52;
    font-weight: bold;
  }
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
  color: #333;

  p {
    margin: 0;
    color: #5c8f52;
    font-weight: bold;
  }
`;

export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const NoFeedsMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 2rem;
`;

export const OwnerInfoSection = styled.section`
  background: linear-gradient(to bottom, #ffffff, #f9f9f9);
  border-radius: 16px;
  padding: 1.8rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaea;
  position: relative;
  overflow: hidden;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #5c8f52;
  }
`;

export const StoreInfoContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const LogoContainer = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
  border: 3px solid white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

export const StoreLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const StoreDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const StoreName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #222;
  position: relative;
  display: inline-block;
`;

export const StoreAddress = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 6px;
    color: #888;
  }
`;

export const StoreDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  white-space: pre-line;
  background-color: #f6f6f6;
  padding: 1.2rem;
  border-radius: 10px;
  border-left: 3px solid #ddd;
  text-align: left;
  max-height: 120px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

export const EditButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

    svg {
      transform: rotate(15deg);
    }
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background-color: #5c8f52;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(92, 143, 82, 0.2);

  &:hover {
    background-color: #4a7a42;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(92, 143, 82, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FeedsSection = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;
