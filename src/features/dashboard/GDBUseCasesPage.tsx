import React from "react";
import { gdbUseCases, GDBRole } from "../../types/gdbUseCases";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const roleColors: Record<GDBRole, string> = {
    Étudiant: "#42a5f5",
    Enseignant: "#66bb6a",
    Administrateur: "#ef5350",
    Système: "#ffa726",
};

const GDBUseCasesPage: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Système de gestion des besoins estudiantins
            </Typography>
            <Grid
                container
                spacing={3}
                columns={12}
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "60vh" }}
            >
                {gdbUseCases.map(({ role, actions }) => (
                    <Grid
                        key={role}
                        size={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card
                            sx={{
                                borderTop: `6px solid ${roleColors[role]}`,
                                minHeight: 340,
                                width: 360,
                                boxShadow: 4,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                mx: "auto",
                                my: 2,
                            }}
                        >
                            <CardContent sx={{ width: "100%" }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: roleColors[role],
                                        mb: 2,
                                        fontWeight: 700,
                                        fontSize: 22,
                                    }}
                                    align="center"
                                >
                                    {role}
                                </Typography>
                                <List dense sx={{ width: "100%" }}>
                                    {actions.map((action) => {
                                        if (
                                            role === "Étudiant" &&
                                            action === "Soumettre miniprojet"
                                        ) {
                                            return (
                                                <ListItem
                                                    key={action}
                                                    component={Link}
                                                    to="/mini-projet-sequence"
                                                    sx={{
                                                        cursor: "pointer",
                                                        justifyContent:
                                                            "center",
                                                        borderRadius: 2,
                                                        bgcolor: "#e3f2fd",
                                                        mb: 1,
                                                        transition:
                                                            "background 0.2s",
                                                        "&:hover": {
                                                            bgcolor: "#bbdefb",
                                                        },
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={action}
                                                        sx={{
                                                            color: "#1976d2",
                                                            fontWeight: 700,
                                                            textAlign: "center",
                                                        }}
                                                    />
                                                </ListItem>
                                            );
                                        }
                                        return (
                                            <ListItem
                                                key={action}
                                                sx={{
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <ListItemText
                                                    primary={action}
                                                    sx={{ textAlign: "center" }}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default GDBUseCasesPage;
