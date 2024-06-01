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
            // selection.getRangeAt(index)는 index에 있는 Range 객체를 반환받음
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const top = rect.top + window.scrollY - 155;
            const left = rect.left + window.scrollX - 405;
            setSelectionPosition({ top, left });
            setSelectedText(selection.toString());
        } else {
            setSelectionPosition(null);
            setSelectedText("");
        }
    };

    const applyStyle = (tag: string, event: MouseEvent) => {
        event.preventDefault();
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const commonAncestorContainer = range.commonAncestorContainer;

        if (!commonAncestorContainer || !commonAncestorContainer.parentElement) return;

        const parentElement = commonAncestorContainer.parentElement;

        const span = document.createElement(tag);
        span.textContent = range.toString();

        if (parentElement.tagName === tag.toUpperCase()) {
            parentElement.replaceWith(document.createTextNode(range.toString()));
        } else {
            span.style.fontWeight = tag === "b" ? "bold" : "normal";
            span.style.fontStyle = tag === "i" ? "italic" : "normal";
            span.style.textDecoration = tag === "u" ? "underline" : "none";

            if (tag === "red") {
                span.style.color = "red";
            } else if (tag === "blue") {
                span.style.color = "blue";
            }

            range.deleteContents();
            range.insertNode(span);
        }

        selection.removeAllRanges();
        setSelectionPosition(null);
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
