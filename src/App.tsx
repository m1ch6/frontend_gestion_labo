import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import AppRouter from "./router";
import { getCurrentUser } from "./features/auth/services/authApi";
import { loginSuccess } from "./store/slices/authSlice";
import { CircularProgress, Box } from "@mui/material";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const loadUserProfile = async () => {
            if (token) {
                try {
                    const user = await getCurrentUser();
                    dispatch(loginSuccess({ user, token }));
                } catch (error) {
                    console.error("Failed to load user profile:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };

        loadUserProfile();
    }, [dispatch, token]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return <AppRouter />;
}

export default App;
