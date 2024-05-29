import styled from "styled-components";
import { Header } from "../../components/Header";
import { ListBox } from "../../components/StudyPlan/ListBox";

export const StudyPlanListPage = () => {
    return (
        <Wrapper>
            <Header />
            <div>
                <TextWrapper>
                    <Text1>웹에서 간단히 하는</Text1>
                    <Text2>스터디 플랜 ✍🏻</Text2>
                </TextWrapper>
                <ListWrapper>
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                    <ListBox />
                </ListWrapper>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin-top: calc(56px + 85px);
    width: 848px;
    justify-content: center;
`;

const Text1 = styled.p`
    font-weight: 400;
    font-size: 20px;
`;

const Text2 = styled.p`
    font-weight: 700;
    font-size: 40px;
`;

const ListWrapper = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    margin-bottom: 130px;
`;
