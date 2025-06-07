import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loginThunk } from "../../../store/slices/authSlice";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Paper,
    Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { LoginRequest } from "../../../types";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading, error } = useAppSelector(
        (state) => state.auth
    );

    const { control, handleSubmit } = useForm<LoginRequest>({
        defaultValues: { username: "", password: "" },
    });

    const onSubmit = (data: LoginRequest) => {
        dispatch(loginThunk(data));
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
                    <Typography component="h1" variant="h5" align="center">
                        Connexion
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "Nom d'utilisateur requis" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Nom d'utilisateur"
                                    autoComplete="username"
                                    autoFocus
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Mot de passe requis" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Mot de passe"
                                    type="password"
                                    autoComplete="current-password"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
