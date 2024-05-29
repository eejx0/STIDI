import { createGlobalStyle } from "styled-components";

export const GlobalFont = createGlobalStyle`
    /* @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    } */
    @font-face {
        font-family: "Pretendard";
        font-weight: 900;
        src: url(pre/Pretendard-Black.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 800;
        src: url(pre/Pretendard-ExtraBold.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 700;
        src: url(pre/Pretendard-Bold.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 600;
        src: url(pre/Pretendard-SemiBold.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 500;
        src: url(pre/Pretendard-Medium.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 400;
        src: url(pre/Pretendard-Regular.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 300;
        src: url(pre/Pretendard-Light.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 200;
        src: url(pre/Pretendard-ExtraLight.woff) format('woff');
    }
    @font-face {
        font-family: "Pretendard";
        font-weight: 100;
        src: url(pre/Pretendard-Thin.woff) format('woff');
    }
`;
