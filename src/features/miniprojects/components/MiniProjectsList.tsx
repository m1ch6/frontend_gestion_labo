import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    IconButton,
    Button,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Alert,
} from "@mui/material";
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    fetchMiniprojects,
    deleteMiniproject,
    clearError,
} from "../../../store/slices/miniprojectSlice";
import { ProjectStatus } from "../../../types";

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

const statusLabels: Record<ProjectStatus, string> = {
    [ProjectStatus.SUBMITTED]: "Soumis",
    [ProjectStatus.VALIDATED]: "Validé",
    [ProjectStatus.ASSIGNED]: "Attribué",
    [ProjectStatus.EVALUATED]: "Évalué",
    [ProjectStatus.REJECTED]: "Rejeté",
};

export default function MiniProjectsList() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        miniprojects,
        loading,
        totalPages,
        currentPage,
        totalElements,
        error,
    } = useAppSelector((state) => state.miniprojects);
    const { user } = useAppSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | "">("");

    const isStudent = user?.role === "STUDENT";
    const isTeacher = user?.role === "TEACHER";
    const isAdmin = user?.role === "ADMIN";

    // Debug info
    useEffect(() => {
        console.log("Current user:", user);
        console.log("User role:", user?.role);
        console.log("Is student?", isStudent);
    }, [user, isStudent]);

    useEffect(() => {
        dispatch(clearError());
        setPage(0);

        dispatch(
            fetchMiniprojects({
                page: 0,
                size: rowsPerPage,
                ...(statusFilter && { status: statusFilter }),
            })
        );
    }, [dispatch, user, rowsPerPage, statusFilter]);

    useEffect(() => {
        if (page !== 0) {
            dispatch(
                fetchMiniprojects({
                    page,
                    size: rowsPerPage,
                    ...(statusFilter && { status: statusFilter }),
                })
            );
        }
    }, [dispatch, page, rowsPerPage, statusFilter]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (id: number) => {
        if (
            window.confirm("Êtes-vous sûr de vouloir supprimer ce miniprojet?")
        ) {
            try {
                await dispatch(deleteMiniproject(id)).unwrap();
                // Refetch after deletion
                dispatch(
                    fetchMiniprojects({
                        page,
                        size: rowsPerPage,
                        ...(statusFilter && { status: statusFilter }),
                    })
                );
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    // More flexible owner checking
    const isOwner = (studentName: string) => {
        if (!isStudent || !user) return false;

        // Try different name formats
        const possibleNames = [
            `${user.firstName} ${user.lastName}`,
            `${user.lastName} ${user.firstName}`,
            `${user.firstName?.toLowerCase()} ${user.lastName?.toLowerCase()}`,
        ];

        return possibleNames.some(
            (name) => name.toLowerCase() === studentName.toLowerCase()
        );
    };

    return (
        <Box>
            {/* Header with Add button */}
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography variant="h4">Miniprojets</Typography>
                    {isStudent && (
                        <Typography variant="caption" color="text.secondary">
                            Vous êtes connecté en tant qu'étudiant
                        </Typography>
                    )}
                </Box>

                {isStudent && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/miniprojects/new")}
                        size="large"
                    >
                        Nouveau Miniprojet
                    </Button>
                )}
            </Box>

            {/* Error display */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Filters */}
            <Paper sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            select
                            fullWidth
                            label="Filtrer par statut"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(
                                    e.target.value as ProjectStatus | ""
                                );
                                setPage(0);
                            }}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            {Object.entries(statusLabels).map(
                                ([value, label]) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titre</TableCell>
                            <TableCell>Étudiant</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell align="center">Note</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Chargement...
                                </TableCell>
                            </TableRow>
                        ) : (miniprojects?.length ?? 0) === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    {isStudent
                                        ? "Vous n'avez pas encore de miniprojet. Cliquez sur 'Nouveau Miniprojet' pour commencer."
                                        : "Aucun miniprojet trouvé"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            (miniprojects ?? []).map(
                                (miniproject: {
                                    id: number;
                                    title: string;
                                    studentName: string;
                                    status: ProjectStatus;
                                    grade?: number;
                                }) => {
                                    const canEdit =
                                        isStudent &&
                                        isOwner(miniproject.studentName) &&
                                        miniproject.status ===
                                            ProjectStatus.SUBMITTED;

                                    return (
                                        <TableRow key={miniproject.id}>
                                            <TableCell>
                                                {miniproject.title}
                                            </TableCell>
                                            <TableCell>
                                                {miniproject.studentName}
                                                {isOwner(
                                                    miniproject.studentName
                                                ) && (
                                                    <Typography
                                                        variant="caption"
                                                        color="primary"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        (Vous)
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        statusLabels[
                                                            miniproject.status as ProjectStatus
                                                        ]
                                                    }
                                                    color={
                                                        statusColors[
                                                            miniproject.status as ProjectStatus
                                                        ]
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {miniproject.grade
                                                    ? `${miniproject.grade}/20`
                                                    : "-"}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(
                                                            `/miniprojects/${miniproject.id}`
                                                        )
                                                    }
                                                    title="Voir les détails"
                                                >
                                                    <ViewIcon />
                                                </IconButton>

                                                {canEdit && (
                                                    <>
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/miniprojects/${miniproject.id}/edit`
                                                                )
                                                            }
                                                            title="Modifier"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    miniproject.id
                                                                )
                                                            }
                                                            title="Supprimer"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            )
                        )}
                    </TableBody>
                </Table>
                {!loading && (miniprojects?.length ?? 0) > 0 && (
                    <TablePagination
                        component="div"
                        count={totalElements}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Lignes par page:"
                    />
                )}
            </TableContainer>
        </Box>
    );
}
