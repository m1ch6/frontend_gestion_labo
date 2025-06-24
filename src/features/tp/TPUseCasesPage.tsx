import React from "react";
import { tpUseCases, TPRole } from "../../types/tpUseCases";
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
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const roleColors: Record<TPRole, string> = {
    Administrateur: "#1976d2",
    Technicien: "#388e3c",
    ResponsableLabo: "#fbc02d",
    Enseignant: "#7b1fa2",
    Etudiant: "#0288d1",
};

const TPUseCasesPage: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Système de gestion des TP
            </Typography>
            <Grid container spacing={3} columns={12}>
                {tpUseCases.map(({ role, actions }) => (
                    <Grid key={role} size={4}>
                        <Card
                            sx={{ borderTop: `6px solid ${roleColors[role]}` }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ color: roleColors[role], mb: 1 }}
                                >
                                    {role}
                                </Typography>
                                <List dense>
                                    {actions.map((action) => {
                                        if (
                                            role === "ResponsableLabo" &&
                                            action ===
                                                "Planifier les séances de TP"
                                        ) {
                                            return (
                                                <ListItem key={action}>
                                                    <Link
                                                        component={RouterLink}
                                                        to="/planifier-seances-tp"
                                                        underline="hover"
                                                        color="inherit"
                                                    >
                                                        <ListItemText
                                                            primary={action}
                                                        />
                                                    </Link>
                                                </ListItem>
                                            );
                                        }
                                        return (
                                            <ListItem key={action}>
                                                <ListItemText
                                                    primary={action}
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

export default TPUseCasesPage;
