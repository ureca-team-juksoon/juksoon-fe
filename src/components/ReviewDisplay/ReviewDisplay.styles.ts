import styled, { css } from "styled-components";

export const ReviewContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background-color: white;
  border: 1px solid #f0f0f0;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 2rem;
  background-color: #fcfcfc;
  border-bottom: 1px solid #eaeaea;
`;

export const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const ReviewDate = styled.span`
  color: #888;
  font-size: 0.95rem;
  font-weight: 500;
`;

export const ReviewLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  background-color: #fafafa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ContentSection = styled.div`
  flex: 2;
  background-color: #fafafa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #eaeaea;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #5c8f52;
  }
`;

export const ImagesGrid = styled.div<{ imageCount: number }>`
  display: grid;
  grid-gap: 0.8rem;
  margin-bottom: 1.5rem;

  ${(props) => {
    switch (props.imageCount) {
      case 1:
        return css`
          grid-template-columns: 1fr;
        `;
      case 2:
        return css`
          grid-template-columns: 1fr 1fr;
        `;
      case 3:
        return css`
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          & > div:nth-child(3) {
            grid-column: span 2;
          }
        `;
      case 4:
      default:
        return css`
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        `;
    }
  }}
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

export const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const NoImagesMessage = styled.div`
  padding: 2.5rem;
  text-align: center;
  color: #888;
  background-color: #f9f9f9;
  font-style: italic;
  border-radius: 8px;
  border: 1px dashed #ddd;
`;

export const ReviewContent = styled.div`
  line-height: 1.8;
  color: #444;
  white-space: pre-line;
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  min-height: 200px;
  border: 1px solid #eaeaea;
  font-size: 1.05rem;
  text-align: left;
`;

export const VideoButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

export const VideoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: #5c8f52;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
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
