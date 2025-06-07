import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/components/LoginPage";
import DashboardPage from "../features/dashboard/components/DashboardPage";
import MiniProjectPage from "../features/miniprojects/components/MiniProjectPage";
import ThesisPage from "../features/thesis/components/ThesisPage";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public */}
                <Route path="/login" element={<LoginPage />} />

                {/* protected area */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardPage />} />
                    <Route
                        path="miniprojects/*"
                        element={<MiniProjectPage />}
                    />
                    <Route path="thesis/*" element={<ThesisPage />} />
                </Route>

                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
