import React from "react";
import { Router } from "./router/router";
import { GlobalFont } from "./styles/globalFont";
import { GlobalStyle } from "./styles/globalStyle";

function App() {
    return (
        <>
            <GlobalFont />
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
