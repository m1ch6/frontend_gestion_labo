import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/components/LoginPage";
import DashboardPage from "../features/dashboard/components/DashboardPage";
import MiniProjectPage from "../features/miniprojects/components/MiniProjectPage";
import ThesisPage from "../features/thesis/components/ThesisPage";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import StudentsPage from "../features/students/StudentsPage";
import MemoiresCrudPage from "../features/memoires/MemoiresCrudPage";
import DocumentsCrudPage from "../features/documents/DocumentsCrudPage";
import NotificationsCrudPage from "../features/notifications/NotificationsCrudPage";
import SoutenancesCrudPage from "../features/soutenances/SoutenancesCrudPage";
import MemoiresPage from "../features/memoires/MemoiresPage";
import DocumentsPage from "../features/documents/DocumentsPage";
import NotificationsPage from "../features/notifications/NotificationsPage";
import SoutenancesPage from "../features/soutenances/SoutenancesPage";
import MiniProjetSubmissionSequencePage from "../pages/MiniProjetSubmissionSequencePage";
import PlanifierSeancesTPPage from "../pages/PlanifierSeancesTPPage";

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
                    <Route path="miniprojects" element={<MiniProjectPage />} />
                    <Route path="thesis/*" element={<ThesisPage />} />
                    <Route path="students" element={<StudentsPage />} />
                    <Route path="memoires" element={<MemoiresPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route
                        path="notifications"
                        element={<NotificationsPage />}
                    />
                    <Route path="soutenances" element={<SoutenancesPage />} />
                    <Route
                        path="mini-projet-sequence"
                        element={<MiniProjetSubmissionSequencePage />}
                    />
                    <Route
                        path="planifier-seances-tp"
                        element={<PlanifierSeancesTPPage />}
                    />
                    {/* CRUD routes for admin/advanced users, not in sidebar */}
                    <Route
                        path="memoires-crud"
                        element={<MemoiresCrudPage />}
                    />
                    <Route
                        path="documents-crud"
                        element={<DocumentsCrudPage />}
                    />
                    <Route
                        path="notifications-crud"
                        element={<NotificationsCrudPage />}
                    />
                    <Route
                        path="soutenances-crud"
                        element={<SoutenancesCrudPage />}
                    />
                </Route>

                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
