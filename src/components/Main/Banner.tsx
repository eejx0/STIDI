import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Banner1 from "../../assets/Banner.svg";
import Banner2 from "../../assets/Banner2.svg";
import LeftButton from "../../assets/LeftButton.svg";
import RightButton from "../../assets/RightButton.svg";

const banners = [Banner1, Banner2, Banner1];

export const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(1);
    const [autoSlide, setAutoSlide] = useState(true);

    // 만약 인덱스가 0일 때 그 전의 배너로 가야할 때 -1을 하면 음수가 됨
    // 근데 맨 마지막으로 이동해야하기 때문에 지금 상황처럼 배너가 3개 있다면
    // 인덱스가 2인곳으로 이동해야 함
    const goToPreviousBanner = () => {
        setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
    };

    const goToNextBanner = useCallback(() => {
        setCurrentBanner((currentBanner + 1) % banners.length);
    }, [currentBanner]);

    const startAutoSlide = () => {
        setAutoSlide(true);
    };

    const stopAutoSlide = () => {
        setAutoSlide(false);
    };

    // autoSlide와 goToNextBanner 값이 변경될 때마다 useEffect 실행
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (autoSlide) {
            interval = setInterval(goToNextBanner, 2000);
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

    &:hover {
        transition: 0.2s;
        background-color: #e6e6e6;
    }

    @media (max-width: 1200px) {
        width: 40px;
        height: 40px;
        ${({ left }) => left && `left: 180px;`}
        ${({ right }) => right && `right: 180px;`}
    }
`;

export default Banner;
