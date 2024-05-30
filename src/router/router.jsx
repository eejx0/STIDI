import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { StudyPlanListPage } from "../pages/StudyPlan/ListPage";
import { StudyPlanDetailPage } from "../pages/StudyPlan/DetailPage";
import { StudyPlanWritePage } from "../pages/StudyPlan/WritePage";
import Banner from "../components/Main/Banner";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/studyPlan" element={<StudyPlanListPage />} />
                <Route path="/studyPlan/detail" element={<StudyPlanDetailPage />} />
                <Route path="/studyPlan/write" element={<StudyPlanWritePage />} />
                <Route path="/banner" element={<Banner />} />
            </Routes>
        </BrowserRouter>
    );
};
