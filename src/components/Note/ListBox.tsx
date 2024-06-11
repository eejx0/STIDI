import styled from "styled-components";
import { Link } from "react-router-dom";

export const NoteListBox = () => {
    return (
        <Link to={"/note/detail"}>
            <Wrapper>
                <Content>테스트</Content>
                <Date>2024.05.29</Date>
            </Wrapper>
        </Link>
    );
};

const Wrapper = styled.div`
    width: 848px;
    height: 24px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 18px 35px;
    display: flex;
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    &:hover {
        box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.13);
        transform: scale(1.04);
    }
`;

const Content = styled.p`
    font-weight: 500;
    font-size: 20px;
    flex-grow: 1;
    color: black;
`;

const Date = styled.p`
    font-weight: 400;
    font-size: 20px;
    color: #555555;
`;
