import { Routes, Route } from "react-router-dom";
import MiniProjectsList from "./MiniProjectsList";
import MiniProjectForm from "./MiniProjectForm";
import MiniProjectDetail from "./MiniProjectDetail";

export default function MiniProjectPage() {
    return (
        <Routes>
            <Route index element={<MiniProjectsList />} />
            <Route path="new" element={<MiniProjectForm />} />
            <Route path=":id" element={<MiniProjectDetail />} />
            <Route path=":id/edit" element={<MiniProjectForm />} />
        </Routes>
    );
}
