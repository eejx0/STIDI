import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: "Pretendard";
        user-select: none;
        ::-webkit-scrollbar {
            width: 0px;
        }
    }

    input, textarea, button {
        border: none;
        outline: none;
        resize: none;
    }
`;
