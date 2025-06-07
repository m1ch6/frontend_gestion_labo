import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../hooks/redux";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // Check if token exists in localStorage as well
    const token = localStorage.getItem("token");

    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
