import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Chip,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    Download as DownloadIcon,
    Upload as UploadIcon,
    CheckCircle as ValidateIcon,
    Assignment as AssignIcon,
    Grade as GradeIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchMiniprojectById } from "../../../store/slices/miniprojectSlice";
import { uploadDocument } from "../services/miniprojectApi";
import { ProjectStatus } from "../../../types";
import FileUploadDialog from "./FileUploadDialog";
import EvaluationDialog from "./EvaluationDialog";

const statusColors: Record<
    ProjectStatus,
    "default" | "primary" | "success" | "warning" | "error"
> = {
    [ProjectStatus.SUBMITTED]: "default",
    [ProjectStatus.VALIDATED]: "primary",
    [ProjectStatus.ASSIGNED]: "warning",
    [ProjectStatus.EVALUATED]: "success",
    [ProjectStatus.REJECTED]: "error",
};

export default function MiniProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentMiniproject, loading, error } = useAppSelector(
        (state) => state.miniprojects
    );
    const { user } = useAppSelector((state) => state.auth);

    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchMiniprojectById(parseInt(id)));
        }
    }, [dispatch, id]);

    const handleFileUpload = async (file: File) => {
        if (id) {
            await uploadDocument(parseInt(id), file);
            dispatch(fetchMiniprojectById(parseInt(id)));
            setUploadDialogOpen(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !currentMiniproject) {
        return (
            <Alert severity="error">{error || "Miniprojet introuvable"}</Alert>
        );
    }

    const isStudent = user?.role === "STUDENT";
    const isTeacher = user?.role === "TEACHER";
    const isAdmin = user?.role === "ADMIN";

    return (
        <Box>
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4">{currentMiniproject.title}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {isTeacher &&
                        currentMiniproject.status ===
                            ProjectStatus.SUBMITTED && (
                            <Button
                                variant="outlined"
                                startIcon={<ValidateIcon />}
                                color="success"
                            >
                                Valider
                            </Button>
                        )}
                    {isTeacher &&
                        currentMiniproject.status ===
                            ProjectStatus.ASSIGNED && (
                            <Button
                                variant="outlined"
                                startIcon={<GradeIcon />}
                                onClick={() => setEvaluationDialogOpen(true)}
                            >
                                Évaluer
                            </Button>
                        )}
                    {(isAdmin || isTeacher) &&
                        currentMiniproject.status ===
                            ProjectStatus.VALIDATED && (
                            <Button
                                variant="outlined"
                                startIcon={<AssignIcon />}
                            >
                                Attribuer Encadrant
                            </Button>
                        )}
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid size={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {currentMiniproject.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom>
                            Informations
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Étudiant
                                </Typography>
                                <Typography variant="body1">
                                    {currentMiniproject.student.fullName}
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Statut
                                </Typography>
                                <Chip
                                    label={currentMiniproject.status}
                                    color={
                                        statusColors[currentMiniproject.status]
                                    }
                                    size="small"
                                />
                            </Grid>
                            {currentMiniproject.supervisor && (
                                <Grid size={6}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                    >
                                        Encadrant
                                    </Typography>
                                    <Typography variant="body1">
                                        {currentMiniproject.supervisor.fullName}
                                    </Typography>
                                </Grid>
                            )}
                            {currentMiniproject.grade !== undefined && (
                                <Grid size={6}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                    >
                                        Note
                                    </Typography>
                                    <Typography variant="body1">
                                        {currentMiniproject.grade}/20
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>

                        {currentMiniproject.feedback && (
                            <>
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="h6" gutterBottom>
                                    Feedback
                                </Typography>
                                <Typography variant="body1">
                                    {currentMiniproject.feedback}
                                </Typography>
                            </>
                        )}
                    </Paper>
                </Grid>

                <Grid size={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6">Documents</Typography>
                            {isStudent &&
                                currentMiniproject.status ===
                                    ProjectStatus.SUBMITTED && (
                                    <IconButton
                                        onClick={() =>
                                            setUploadDialogOpen(true)
                                        }
                                    >
                                        <UploadIcon />
                                    </IconButton>
                                )}
                        </Box>

                        <List>
                            {currentMiniproject.documents.map((doc) => (
                                <ListItem key={doc.id}>
                                    <ListItemText
                                        primary={doc.fileName}
                                        secondary={`${(doc.size / 1024).toFixed(
                                            2
                                        )} KB`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <DownloadIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        {currentMiniproject.documents.length === 0 && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                align="center"
                            >
                                Aucun document
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <FileUploadDialog
                open={uploadDialogOpen}
                onClose={() => setUploadDialogOpen(false)}
                onUpload={handleFileUpload}
            />

            <EvaluationDialog
                open={evaluationDialogOpen}
                onClose={() => setEvaluationDialogOpen(false)}
                miniprojectId={currentMiniproject.id}
                onSuccess={() => {
                    dispatch(fetchMiniprojectById(currentMiniproject.id));
                    setEvaluationDialogOpen(false);
                }}
            />
        </Box>
    );
}
