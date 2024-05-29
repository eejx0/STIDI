import { Header } from "../components/Header";
import styled from "styled-components";
import Banner from "../assets/Banner.svg";
// import SpaceMan from "../assets/SpaceMan.svg";
import { ContentBox } from "../components/Main/ContentBox";

export const MainPage = () => {
    return (
        <Wrapper>
            <Header />
            <BannerImg src={Banner} alt="" />
            <MainWrapper>
                <TextWrapper>
                    <TitleWrapper>
                        <div style={{ display: "flex" }}>
                            <Text1>공부</Text1>
                            <Text2>를</Text2>
                        </div>
                        <Text2>쉽고 편하게,</Text2>
                    </TitleWrapper>
                    <div>
                        <Text3>STIDI로 공부를 더 체계적이고</Text3>
                        <Text3>편안하게 해보세요</Text3>
                    </div>
                </TextWrapper>
                {/* <ImgWrapper>
                    <SpaceManImg src={SpaceMan} alt="" />
                </ImgWrapper> */}
                <ContentBox />
            </MainWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const BannerImg = styled.img`
    width: 100%;
    height: 165px;
    margin-top: calc(17px + 56px);
`;

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 70px;
`;

const TextWrapper = styled.div`
    gap: 45px;
    display: flex;
    flex-direction: column;
    z-index: 10000;
`;

const TitleWrapper = styled.div`
    gap: 6px;
`;

const Text1 = styled.p`
    font-size: 50px;
    font-weight: 800;
    color: #3485ff;
`;

const Text2 = styled.p`
    font-size: 50px;
    font-weight: 800;
`;

const Text3 = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: #555555;
`;

// const ImgWrapper = styled.div`
//     position: relative;
//     height: calc(100vh - 165px - (17px + 56px));
// `;

// const SpaceManImg = styled.img`
//     position: absolute;
//     bottom: 0;
// `;
