import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { StudyPlanListPage } from "../pages/StudyPlan/ListPage";
import { StudyPlanDetailPage } from "../pages/StudyPlan/DetailPage";
import { StudyPlanWritePage } from "../pages/StudyPlan/WritePage";
import { NoteListPage } from "../pages/Note/ListPage";
import { NoteWritePage } from "../pages/Note/WritePage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/studyPlan" element={<StudyPlanListPage />} />
                <Route path="/studyPlan/detail" element={<StudyPlanDetailPage />} />
                <Route path="/studyPlan/write" element={<StudyPlanWritePage />} />
                <Route path="/note" element={<NoteListPage />} />
                <Route path="/note/write" element={<NoteWritePage />} />
            </Routes>
        </BrowserRouter>
    );
};
