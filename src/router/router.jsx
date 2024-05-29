import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { StudyPlanListPage } from "../pages/StudyPlan/List";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/studyPlan" element={<StudyPlanListPage />} />
            </Routes>
        </BrowserRouter>
    );
};
