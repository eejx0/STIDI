import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { Header } from "../../components/Header";
import styled from "styled-components";

export const NoteWritePage: React.FC = () => {
    const [, setSelectedText] = useState("");
    const [selectionPosition, setSelectionPosition] = useState<{ top: number; left: number } | null>(null);
    const contentEditableRef = useRef<HTMLDivElement>(null);

    const handleMouseUp = () => {
        // window.getSelection은 선택된 텍스트의 범위를 나타냄
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            // --> 선택된 텍스트의 위치 계산
            // selection.getRangeAt(index)는 index에 있는 Range 객체를 반환받음
            // 사용자가 선택한 첫 번째 텍스트 범위를 반환한 거임
            const range = selection.getRangeAt(0);
            // range.getBoundingClientRect()는 선택된 텍스트 범위의 위치와 크기를 나타내는 객체 반환
            // rect 객체엔 top, right, bottom, left, width, height 등의 속성이 있음
            const rect = range.getBoundingClientRect();
            // 그냥 top, left 위치 조정한거
            const top = rect.top + window.scrollY - 155;
            const left = rect.left + window.scrollX - 405;
            // 선택된 텍스트와 위치를 상태로 업데이트
            setSelectionPosition({ top, left });
            setSelectedText(selection.toString());
        } else {
            // 선택된 텍스트가 없을 때 상태 초기화
            setSelectionPosition(null);
            setSelectedText("");
        }
    };

    const applyStyle = (tag: string, event: MouseEvent) => {
        // event.preventDefault()는 이벤트 기본 동작 방지함
        // 예를 들면 a태그 클릭했을 때 링크로 이동되는거 방지하고 싶을 때..
        event.preventDefault();
        const selection = window.getSelection();
        // 선택된 텍스트가 없거나 선택된 범위가 없으면 함수 종료
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        // 선택된 범위의 공통 조상 컨테이너를 가져옴
        // 공식문서에 공통 조상 컨테이너라고 적혀있어서 뭘까 하고 찾아보니까
        // 만약 <p>세븐틴은 <b>진짜</b> 잘생겼다.</p> 이런 코드가 있다고 치면
        // 진짜 잘생겼다를 선택했을 때 두 텍스트 노드의 가장 가까운 조상은 p 태그임
        // 따라서 선택된 텍스트 범위의 시작과 끝을 모두 포함하는 가장 낮은 공통 조상 노드를 찾아 스타일을 적용하기 위해 사용
        const commonAncestorContainer = range.commonAncestorContainer;

        // 공통 조상 컨테이너나 그 부모 요소가 없으면 함수 종료
        // 선택된 텍스트에 스타일을 적용하려면 텍스트가 유효한 HTML 요소에 포함되어있어야하기 때문
        if (!commonAncestorContainer || !commonAncestorContainer.parentElement) return;

        const parentElement = commonAncestorContainer.parentElement;

        // 사용자가 Hello world라는 텍스트를 선택했을 때 range.toString()은 "Hello wrold"를 반환하는 구조
        const span = document.createElement(tag);
        span.textContent = range.toString();

        // --> 부모요소의 태그가 적용하려는 태그와 동일하면 스타일 해제
        // tag.toUpperCase()는 적용하려는 스타일의 태그 이름을 대문자료 변환함
        // 예를 들어서 <p>세븐틴은 <b>진짜</b> 잘생겼다.</p> 라는 코드가 있을 때
        // 사용자가 진짜라는 단어를 선택하고 스타일을 적용하려는 태그가 <b>라면 parentElement.tagName은 B임
        // tag는 b임 따라서 tag.toUpperCase()는 B임
        if (parentElement.tagName === tag.toUpperCase()) {
            // document.createTextNode(range.toString())는 선택된 텍스트를 포함하는 새로운 텍스트 노드 생성
            // 예를 들어서 parentElement가 <b>진짜</b>이고 range.toString은 "진짜"임
            // document.createTextNode("진짜")은 새로운 텍스트 노드를 생성함
            // 아래 코드는 <b>진짜</b>을 "진짜"이라는 텍스트 노드로 대체함
            // 결과적으로 HTML은 <p>세븐틴은 진짜 잘생겼다.</p> 이런식으로 변함
            parentElement.replaceWith(document.createTextNode(range.toString()));
        } else {
            // 스타일 적용
            span.style.fontWeight = tag === "b" ? "bold" : "normal";
            span.style.fontStyle = tag === "i" ? "italic" : "normal";
            span.style.textDecoration = tag === "u" ? "underline" : "none";

            if (tag === "red") {
                span.style.color = "red";
            } else if (tag === "blue") {
                span.style.color = "blue";
            }

            // 선택된 범위의 내용 삭제하고 새로 생성한 span 요소 삽입
            range.deleteContents();
            range.insertNode(span);
        }

        // 선택된 텍스트 범위 제거하고 선택된 텍스트 위치 상태 초기화
        selection.removeAllRanges();
        setSelectionPosition(null);
    };

    // 컴포넌트가 마운트 되는건 React 컴포넌트가 처음으로 DOM에 추가되고 브라우저에 렌더링 되는 것
    // 컴포넌트가 마운트될 때 이벤트 리스너 등록, 언마운트될 때 해제
    // 텍스트 선택 시의 처리를 위해 필요한 초기화, 정리 작업 수행
    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    // 키보드 이벤트
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Backspace나 Delete 키 눌렀을 때 선택된 텍스트 위치 초기화
        if (event.key === "Backspace" || event.key === "Delete") {
            setSelectionPosition(null);
        }
    };

    return (
        <Wrapper>
            <Header />
            <Box>
                <SubjectNameInput placeholder="과목" />
                {selectionPosition && (
                    <Toolbar style={{ top: `${selectionPosition.top}px`, left: `${selectionPosition.left}px` }}>
                        <StyleButton onMouseDown={(e) => applyStyle("b", e)}>B</StyleButton>
                        <StyleButton onMouseDown={(e) => applyStyle("i", e)}>I</StyleButton>
                        <StyleButton onMouseDown={(e) => applyStyle("u", e)}>U</StyleButton>
                        <StyleButton onMouseDown={(e) => applyStyle("red", e)}>R</StyleButton>
                        <StyleButton onMouseDown={(e) => applyStyle("blue", e)}>B</StyleButton>
                    </Toolbar>
                )}
                <ContentEditableDiv
                    ref={contentEditableRef}
                    contentEditable
                    onMouseUp={handleMouseUp}
                    onKeyDown={handleKeyDown}
                    data-placeholder="자유롭게 노트 필기를 해주세요 ✍🏻"
                />
            </Box>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 97px;
    align-items: center;
    gap: 20px;
    position: relative;
`;

const SubjectNameInput = styled.input`
    width: 1088px;
    height: 51px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding-left: 20px;
    font-size: 17px;
    font-weight: 500;
    &:focus {
        box-shadow: 0px 4px 7px 4px rgba(0, 0, 0, 0.15);
    }
    @media (max-width: 1200px) {
        width: 750px;
    }

    @media (max-width: 900px) {
        width: 650px;
    }

    @media (max-width: 800px) {
        width: 550px;
    }
`;

const StyleButton = styled.button`
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: white;
    &:hover {
        transition: 0.2s;
        background-color: rgba(0, 0, 0, 0.12);
    }
`;

const ContentEditableDiv = styled.div`
    width: 1068px;
    min-height: 762px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 20px;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 41px;
    &:focus {
        outline: none;
        box-shadow: 0px 6px 10px 6px rgba(0, 0, 0, 0.15);
    }

    &[contenteditable]:empty:before {
        content: attr(data-placeholder);
        color: gray;
    }

    @media (max-width: 1200px) {
        width: 730px;
    }

    @media (max-width: 900px) {
        width: 630px;
    }

    @media (max-width: 800px) {
        width: 530px;
    }
`;

const Toolbar = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 5px;
    display: flex;
    gap: 5px;
    z-index: 1000;
`;
