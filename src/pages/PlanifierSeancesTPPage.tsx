import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Snackbar,
    Alert,
} from "@mui/material";
import { laboratories, groups, sessions } from "./planifierTPData";

interface Planning {
    laboratory: string;
    group: string;
    session: string;
}

const PlanifierSeancesTPPage: React.FC = () => {
    const [selectedLab, setSelectedLab] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedSession, setSelectedSession] = useState("");
    const [plannings, setPlannings] = useState<Planning[]>([]);
    const [success, setSuccess] = useState(false);

    const handlePlan = () => {
        if (selectedLab && selectedGroup && selectedSession) {
            setPlannings([
                ...plannings,
                {
                    laboratory: selectedLab,
                    group: selectedGroup,
                    session: selectedSession,
                },
            ]);
            setSuccess(true);
            setSelectedLab("");
            setSelectedGroup("");
            setSelectedSession("");
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Planifier les séances de TP
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Sélectionnez un laboratoire, un groupe et une séance pour
                planifier une session de TP.
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
                <Grid container spacing={2} columns={12}>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Laboratoire</InputLabel>
                            <Select
                                value={selectedLab}
                                label="Laboratoire"
                                onChange={(e) => setSelectedLab(e.target.value)}
                            >
                                {laboratories.map((lab) => (
                                    <MenuItem key={lab.id} value={lab.name}>
                                        {lab.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Groupe</InputLabel>
                            <Select
                                value={selectedGroup}
                                label="Groupe"
                                onChange={(e) =>
                                    setSelectedGroup(e.target.value)
                                }
                            >
                                {groups.map((group) => (
                                    <MenuItem key={group.id} value={group.name}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Séance</InputLabel>
                            <Select
                                value={selectedSession}
                                label="Séance"
                                onChange={(e) =>
                                    setSelectedSession(e.target.value)
                                }
                            >
                                {sessions.map((session) => (
                                    <MenuItem
                                        key={session.id}
                                        value={session.name}
                                    >
                                        {session.name} - {session.date} à{" "}
                                        {session.time}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, textAlign: "right" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlan}
                        disabled={
                            !(selectedLab && selectedGroup && selectedSession)
                        }
                    >
                        Planifier
                    </Button>
                </Box>
            </Paper>
            <Typography variant="h6" gutterBottom>
                Séances planifiées
            </Typography>
            <Paper sx={{ p: 2 }}>
                <List>
                    {plannings.length === 0 && (
                        <ListItem>
                            <ListItemText primary="Aucune séance planifiée pour le moment." />
                        </ListItem>
                    )}
                    {plannings.map((plan, idx) => (
                        <React.Fragment key={idx}>
                            <ListItem>
                                <ListItemText
                                    primary={`Labo: ${plan.laboratory} | Groupe: ${plan.group} | Séance: ${plan.session}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Séance planifiée avec succès !
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PlanifierSeancesTPPage;
