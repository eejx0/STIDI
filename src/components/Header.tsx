import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import StudyPlan from "../assets/StudyPlan.svg";
import Note from "../assets/Note.svg";

export const Header = () => {
    return (
        <Wrapper>
            <LayOut>
                <Link to={"/"}>
                    <img src={Logo} alt="로고" />
                </Link>
                <IconWrapper>
                    <Link to={"/studyPlan"}>
                        <img src={StudyPlan} alt="스터디플래너" />
                    </Link>
                    <Link to={"/note"}>
                        <img src={Note} alt="노트 필기" />
                    </Link>
                </IconWrapper>
            </LayOut>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 56px;
    position: fixed;
    top: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid #dfdfdf;
`;

const LayOut = styled.div`
    display: flex;
    flex-direction: row;
    width: 894px;
    justify-content: space-between;
`;

const IconWrapper = styled.div`
    width: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
        width: 18px;
    }
`;
