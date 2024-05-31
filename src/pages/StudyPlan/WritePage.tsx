import { Header } from "../../components/Header";
import styled from "styled-components";
import React, { useState } from "react";
import Delete from "../../assets/Delete.svg";
import { Link } from "react-router-dom";
import Right from "../../assets/Right.svg";

interface InputWrapProps {
    key: number;
}

export const StudyPlanWritePage: React.FC = () => {
    const [inputWraps, setInputWraps] = useState<InputWrapProps[]>([{ key: 0 }]);
    const [nextKey, setNextKey] = useState(1);

    const addInputWrap = (): void => {
        setInputWraps((prevInputWraps) => [...prevInputWraps, { key: nextKey }]);
        setNextKey((prevKey) => prevKey + 1);
    };

    const deleteInputWrap = (key: number): void => {
        setInputWraps((prevInputWraps) => prevInputWraps.filter((inputWrap) => inputWrap.key !== key));
    };

    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <FirstBox>
                    <Date>2024년 5월 29일 📆</Date>
                    <LetterBox>
                        <Text>나에게 적는 한마디</Text>
                        <TextBox placeholder="ex) 오늘도 화이팅!"></TextBox>
                    </LetterBox>
                </FirstBox>
                <AddButton onClick={addInputWrap}>할 일 추가</AddButton>
            </ContentWrapper>
            <TodoWrapper>
                {inputWraps.map((inputWrap) => (
                    <InputWrapper key={inputWrap.key}>
                        <SubjectInput placeholder="과목"></SubjectInput>
                        <TodoInput placeholder="할 일을 입력해주세요"></TodoInput>
                        <img
                            src={Delete}
                            alt="delete"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteInputWrap(inputWrap.key)}
                        />
                    </InputWrapper>
                ))}
            </TodoWrapper>
            <Link to={"/studyPlan"}>
                <WriteButton>
                    <img src={Right} alt="" />
                </WriteButton>
            </Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 505px;

    @media (max-width: 1200px) {
        gap: 300px;
    }

    @media (max-width: 1024px) {
        gap: 150px;
    }

    @media (max-width: 800px) {
        gap: 70px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }
`;

const FirstBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const Date = styled.p`
    margin-top: calc(56px + 68px);
    font-size: 38px;
    font-weight: 700;
`;

const LetterBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-top: 52px;
`;

const Text = styled.p`
    font-size: 20px;
    font-weight: 700;
`;

const TextBox = styled.textarea`
    width: 530.4px;
    height: calc(103.03px - 18px);
    border-top: 1px solid #555555;
    border-bottom: 1px solid #555555;
    font-size: 17px;
    font-weight: 500;
    padding-top: 9px;
    padding-bottom: 9px;
`;

const AddButton = styled.div`
    width: 126px;
    height: 39px;
    background-color: #3485ff;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 600;
    color: white;
    margin-top: 20px;
    &:hover {
        transition: 0.2s;
        background-color: #0066ff;
    }

    @media (min-width: 768px) {
        margin-top: 328px;
    }
`;

const TodoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: calc(75px + 56px);
    margin-bottom: 169px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const SubjectInput = styled.input`
    width: 141px;
    height: 51px;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding-left: 20px;
    font-size: 17px;
    font-weight: 500;
    &:focus {
        box-shadow: 0px 4px 7px 4px rgba(0, 0, 0, 0.15);
    }
`;

const TodoInput = styled.input`
    width: 931px;
    height: 51px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding-left: 20px;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 500;
    @media (max-width: 1200px) {
        width: 730px;
    }

    @media (max-width: 1100px) {
        width: 730px;
    }

    @media (max-width: 1000px) {
        width: 370px;
    }

    @media (max-width: 1024px) {
        width: 580px;
    }

    @media (max-width: 800px) {
        width: 370px;
    }
    &:focus {
        box-shadow: 0px 4px 7px 4px rgba(0, 0, 0, 0.15);
    }
`;

const WriteButton = styled.div`
    position: absolute;
    position: fixed;
    top: 770px;
    right: 85px;
    width: 78px;
    height: 78px;
    background-color: #3485ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        transition: 0.2s;
        background-color: #0066ff;
    }
`;
