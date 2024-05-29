import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <Wrapper>
            <LayOut>
                <Left>
                    <Nav to="/">{/* <img src={Logo} style={{ marginRight: "auto", marginLeft: "45px" }}></img> */}</Nav>
                    <NavWrapper>
                        <Nav to="/">
                            <div>홈</div>
                        </Nav>
                    </NavWrapper>
                </Left>
            </LayOut>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10000;
`;

const LayOut = styled.div`
    padding: 20px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 207px;
`;

const NavWrapper = styled.div`
    display: flex;
    gap: 70px;
    align-items: center;
    justify-content: space-between;
`;

const Nav = styled(Link)`
    text-decoration: none;
    color: black;
    transition: 0.2s;
    &:hover {
        color: #878787;
    }
`;
