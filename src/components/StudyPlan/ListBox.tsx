import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface StudyPlanData {
    id: number;
    displayDate: string;
    listDate: string;
    textBoxValue: string;
    inputWraps: {
        key: number;
        subject?: string;
        todo?: string;
    }[];
}

export const StudyPlanListBox = () => {
    const [studyPlans, setStudyPlans] = useState<StudyPlanData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedPlans = localStorage.getItem("studyPlans");
        if (storedPlans) {
            setStudyPlans(JSON.parse(storedPlans));
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Message>로딩중 ... 😪</Message>;
    }
    if (studyPlans.length === 0) {
        return <Message>STIDI에서 공부 계획을 세워보세요! 😺</Message>;
    }

    return (
        <>
            {studyPlans
                .slice()
                .reverse()
                .map((plan, index) => (
                    <Link key={index} to={`/studyPlan/detail/${plan.id}`}>
                        <Wrapper>
                            <Content>{plan.textBoxValue}</Content>
                            <Date>{plan.listDate}</Date>
                        </Wrapper>
                    </Link>
                ))}
        </>
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

const Message = styled.p`
    font-weight: 500;
    font-size: 20px;
    margin-top: 50px;
`;
