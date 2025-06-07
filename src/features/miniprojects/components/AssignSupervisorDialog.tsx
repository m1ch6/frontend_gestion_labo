import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Alert,
} from "@mui/material";
import api from "../../../services/api";
import { TeacherSummaryResponse } from "../../../types";

interface Props {
    open: boolean;
    onClose: () => void;
    onAssign: (teacherId: number) => void;
}

export default function AssignSupervisorDialog({
    open,
    onClose,
    onAssign,
}: Props) {
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | "">("");
    const [teachers, setTeachers] = useState<TeacherSummaryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            fetchTeachers();
        }
    }, [open]);

    const fetchTeachers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/teachers");
            setTeachers(response.data);
        } catch (err) {
            setError("Failed to load teachers");
            console.error("Error fetching teachers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = () => {
        if (selectedTeacherId) {
            onAssign(selectedTeacherId as number);
            setSelectedTeacherId("");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Attribuer un encadrant</DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <CircularProgress />
                ) : (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Sélectionner un enseignant</InputLabel>
                        <Select
                            value={selectedTeacherId}
                            onChange={(e) =>
                                setSelectedTeacherId(
                                    e.target.value as number | ""
                                )
                            }
                            label="Sélectionner un enseignant"
                        >
                            <MenuItem value="">
                                <em>Aucun</em>
                            </MenuItem>
                            {teachers.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>
                                    {teacher.fullName} - {teacher.department}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button
                    onClick={handleAssign}
                    variant="contained"
                    disabled={!selectedTeacherId || loading}
                >
                    Attribuer
                </Button>
            </DialogActions>
        </Dialog>
    );
}
