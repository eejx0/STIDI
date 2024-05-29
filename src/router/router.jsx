import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { StudyPlanListPage } from "../pages/StudyPlan/ListPage";
import { ListBox } from "../components/StudyPlan/ListBox";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/studyPlan" element={<StudyPlanListPage />} />
                <Route path="/list" element={<ListBox />} />
            </Routes>
        </BrowserRouter>
    );
};
