import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner1 from "../../assets/Banner.svg";
import LeftButton from "../../assets/LeftButton.svg";
import RightButton from "../../assets/RightButton.svg";

interface BannerProps {}

const banners = [Banner1, Banner1, Banner1];

export const Banner: React.FC<BannerProps> = () => {
    const [currentBanner, setCurrentBanner] = useState(1);
    const [autoSlide, setAutoSlide] = useState(true);

    const goToPreviousBanner = () => {
        setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
    };

    const goToNextBanner = () => {
        setCurrentBanner((currentBanner + 1) % banners.length);
    };

    const startAutoSlide = () => {
        setAutoSlide(true);
    };

    const stopAutoSlide = () => {
        setAutoSlide(false);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (autoSlide) {
            interval = setInterval(goToNextBanner, 3000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [autoSlide, goToNextBanner]);

    const renderBanners = () => {
        const bannerElements = [];
        for (let index = 0; index < banners.length; index++) {
            bannerElements.push(<BannerImage key={index} src={banners[index]} alt={`Banner ${index + 1}`} />);
        }
        return bannerElements;
    };

    return (
        <BannerWrap onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
            <ButtonWrap left onClick={goToPreviousBanner}>
                <img src={LeftButton} alt="Left Button" />
            </ButtonWrap>
            <ButtonWrap right onClick={goToNextBanner}>
                <img src={RightButton} alt="Right Button" />
            </ButtonWrap>
            <BannersContainer currentBanner={currentBanner}>{renderBanners()}</BannersContainer>
        </BannerWrap>
    );
};

const BannerWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 180px;
`;

const BannersContainer = styled.div<{ currentBanner: number }>`
    display: flex;
    transition: transform 0.5s;
    transform: translateX(-${({ currentBanner }) => currentBanner * 100}%);
    width: 70%;
    gap: 10px;
`;

const BannerImage = styled.img`
    flex-shrink: 0;
    width: 100%;
    height: auto;
    cursor: pointer;
`;

const ButtonWrap = styled.div<{ left?: boolean; right?: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 62px;
    height: 62px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 7px 3px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 1;
    ${({ left }) => left && `left: 150px;`}
    ${({ right }) => right && `right: 150px;`}

    @media (max-width: 1200px) {
        width: 40px;
        height: 40px;
        ${({ left }) => left && `left: 180px;`}
        ${({ right }) => right && `right: 180px;`}
    }
`;

export default Banner;
