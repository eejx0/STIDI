import { Header } from "../../components/Header";
import styled from "styled-components";
import Check from "../../assets/Check.svg";
import Delete from "../../assets/Delete.svg";
import { useState } from "react";

export const StudyPlanDetailPage: React.FC = () => {
    const [todos, setTodos] = useState([
        { id: 1, subject: "수학", task: "교과서 19p ~ 20p 복습하기" },
        {
            id: 2,
            subject: "국어",
            task: "교과서 19p ~ 20p 복습하기",
        },
        { id: 3, subject: "사회", task: "교과서 19p ~ 20p 복습하기" },
        { id: 4, subject: "과학", task: "교과서 19p ~ 20p 복습하기" },
        {
            id: 5,
            subject: "데프",
            task: "교과서 19p ~ 20p 복습하기",
        },
        { id: 6, subject: "운영체제", task: "교과서 19p ~ 20p 복습하기" },
        { id: 7, subject: "역사", task: "교과서 19p ~ 20p 복습하기" },
        { id: 8, subject: "문학", task: "교과서 19p ~ 20p 복습하기" },
    ]);

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <FirstBox>
                    <Date>2024년 5월 29일 📆</Date>
                    <LetterBox>
                        <Text>나에게 적는 한마디</Text>
                        <TextBox>오늘도 화이팅! 😊</TextBox>
                    </LetterBox>
                </FirstBox>
                <TableWrapper>
                    <Table>
                        <tbody>
                            {todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>
                                        <CheckBox type="checkbox" />
                                    </td>
                                    <td>
                                        <SubjectName>{todo.subject}</SubjectName>
                                    </td>
                                    <td>
                                        <TodoThing>{todo.task}</TodoThing>
                                    </td>
                                    <td>
                                        <img
                                            src={Delete}
                                            alt=""
                                            onClick={() => handleDelete(todo.id)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentWrapper = styled.div`
    width: 1162.18px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 1200px) {
        width: 900px;
    }

    @media (max-width: 1000px) {
        width: 800px;
    }

    @media (max-width: 800px) {
        width: 600px;
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

const TextBox = styled.div`
    width: 530.4px;
    height: calc(103.03px - 18px);
    border-top: 1px solid #555555;
    border-bottom: 1px solid #555555;
    font-size: 17px;
    font-weight: 500;
    padding-top: 9px;
    padding-bottom: 9px;
`;

const TableWrapper = styled.div`
    margin-top: 88px;
    margin-bottom: 169px;
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    /* text-align: left; */

    th,
    td {
        padding: 16px;
        border-bottom: 1px solid #dddddd;
    }

    th {
        background-color: #f2f2f2;
        font-size: 18px;
    }

    td {
        font-size: 17px;
    }
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
    width: 22px;
    height: 22px;
    cursor: pointer;
    appearance: none;
    border: 1px solid #3485ff;
    border-radius: 3px;
    position: relative;
    outline: none;

    &:hover {
        transition: 0.2s;
        background-color: #c7ddff;
    }

    &:checked {
        transition: 0.2s;
        background-color: #3485ff;
    }

    &:checked::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 13px;
        height: 13px;
        background-image: url(${Check});
        background-size: cover;
        transform: translate(-50%, -50%);
    }
`;

const SubjectName = styled.p`
    font-size: 20px;
    font-weight: 700;
    margin-left: 17px;
`;

const TodoThing = styled.p`
    font-size: 17px;
    font-weight: 500;
    margin-left: 47px;
`;

const DeleteIcon = styled.img`
    cursor: pointer;
`;
