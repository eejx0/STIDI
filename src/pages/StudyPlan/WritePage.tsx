import { Header } from "../../components/Header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Delete from "../../assets/Delete.svg";
import { useNavigate } from "react-router-dom";
import Right from "../../assets/Right.svg";

interface InputWrapProps {
    key: number;
    subject?: string;
    todo?: string;
}

export const StudyPlanWritePage: React.FC = () => {
    const [inputWraps, setInputWraps] = useState<InputWrapProps[]>([{ key: 0 }]);
    const [nextKey, setNextKey] = useState(1);
    const [textBoxValue, setTextBoxValue] = useState("");
    const [, setCurrentDate] = useState("");
    const [, setListDate] = useState("");
    const navigate = useNavigate();

    const formatDate = (date: Date): string => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}.${mm}.${dd}`;
    };

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 📆`;
        const formattedListDate = formatDate(today);
        setCurrentDate(formattedDate);
        setListDate(formattedListDate);
    }, []);

    const addInputWrap = () => {
        setInputWraps((prevInputWraps) => [...prevInputWraps, { key: nextKey }]);
        setNextKey((prevKey) => prevKey + 1);
    };

    const deleteInputWrap = (key: number) => {
        setInputWraps((prevInputWraps) => prevInputWraps.filter((inputWrap) => inputWrap.key !== key));
    };

    const handleInputChange = (key: number, field: "subject" | "todo", value: string) => {
        setInputWraps((prevInputWraps) =>
            prevInputWraps.map((inputWrap) => (inputWrap.key === key ? { ...inputWrap, [field]: value } : inputWrap))
        );
    };

    const saveToLocalStorage = () => {
        const today = new Date();
        const displayDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 📅`;
        const listDate = formatDate(today);

        const newPlan = {
            displayDate,
            listDate,
            textBoxValue,
            inputWraps,
        };

        const storedPlans = localStorage.getItem("studyPlans");
        const studyPlans = storedPlans ? JSON.parse(storedPlans) : [];
        studyPlans.push(newPlan);
        localStorage.setItem("studyPlans", JSON.stringify(studyPlans));

        navigate("/studyPlan");
    };

    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <FirstBox>
                    <TextDate>
                        {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })} 📅
                    </TextDate>
                    <LetterBox>
                        <Text>나에게 적는 한마디</Text>
                        <TextBox
                            value={textBoxValue}
                            onChange={(e) => setTextBoxValue(e.target.value)}
                            placeholder="ex) 오늘도 화이팅!"
                        ></TextBox>
                    </LetterBox>
                </FirstBox>
                <AddButton onClick={addInputWrap}>할 일 추가</AddButton>
            </ContentWrapper>
            <TodoWrapper>
                {inputWraps.map((inputWrap) => (
                    <InputWrapper key={inputWrap.key}>
                        <SubjectInput
                            value={inputWrap.subject || ""}
                            onChange={(e) => handleInputChange(inputWrap.key, "subject", e.target.value)}
                            placeholder="과목"
                        ></SubjectInput>
                        <TodoInput
                            value={inputWrap.todo || ""}
                            onChange={(e) => handleInputChange(inputWrap.key, "todo", e.target.value)}
                            placeholder="할 일을 입력해주세요"
                        ></TodoInput>
                        <img
                            src={Delete}
                            alt="delete"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteInputWrap(inputWrap.key)}
                        />
                    </InputWrapper>
                ))}
            </TodoWrapper>
            <WriteButton onClick={saveToLocalStorage}>
                <img src={Right} alt="" />
            </WriteButton>
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

const TextDate = styled.p`
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
