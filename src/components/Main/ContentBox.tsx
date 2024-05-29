import ExampleStudyPlan from "../../assets/ExampleStudyPlan.svg";
import ExampleNote from "../../assets/ExampleNote.svg";
import styled from "styled-components";

export const ContentBox = () => {
    return (
        <Wrapper>
            <BoxWrapper>
                <img src={ExampleStudyPlan} alt="" />
                <TextBox>
                    <Title>스터디 플래너 작성</Title>
                    <Text>할 일을 추가하고 삭제할 수 있습니다</Text>
                </TextBox>
            </BoxWrapper>
            <BoxWrapper>
                <img src={ExampleNote} alt="" />
                <TextBox>
                    <Title>노트 필기</Title>
                    <Text>배운 내용을 필기할 수 있습니다</Text>
                </TextBox>
            </BoxWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    gap: 27px;
    margin-left: 202px;
`;

const BoxWrapper = styled.div`
    width: 365px;
    height: 526px;
    background-color: white;
    border-radius: 30px;
    border: 1px solid #e3e3e3;
    box-shadow: 4px 10px 7px 0px rgba(0, 0, 0, 0.12);
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 36px;
    margin-left: 30px;
`;

const Title = styled.p`
    font-weight: 700;
    font-size: 25px;
`;

const Text = styled.p`
    font-weight: 400;
    font-size: 20px;
    color: #555555;
`;
