import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Grid,
    CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    createMiniproject,
    updateMiniproject,
    fetchMiniprojectById,
    clearCurrentMiniproject,
} from "../../../store/slices/miniprojectSlice";
import { MiniprojectCreateDTO, MiniprojectUpdateDTO } from "../../../types";

export default function MiniProjectForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;

    const { currentMiniproject, loading } = useAppSelector(
        (state) => state.miniprojects
    );

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MiniprojectCreateDTO>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    useEffect(() => {
        if (isEdit && id) {
            dispatch(fetchMiniprojectById(parseInt(id)));
        }
        return () => {
            dispatch(clearCurrentMiniproject());
        };
    }, [dispatch, id, isEdit]);

    useEffect(() => {
        if (currentMiniproject && isEdit) {
            reset({
                title: currentMiniproject.title,
                description: currentMiniproject.description,
            });
        }
    }, [currentMiniproject, isEdit, reset]);

    const onSubmit = async (
        data: MiniprojectCreateDTO | MiniprojectUpdateDTO
    ) => {
        try {
            if (isEdit && id) {
                await dispatch(
                    updateMiniproject({ id: parseInt(id), data })
                ).unwrap();
            } else {
                await dispatch(
                    createMiniproject(data as MiniprojectCreateDTO)
                ).unwrap();
            }
            navigate("/miniprojects");
        } catch (error) {
            console.error("Error saving miniproject:", error);
        }
    };

    if (loading && isEdit) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {isEdit ? "Modifier le Miniprojet" : "Nouveau Miniprojet"}
            </Typography>

            <Paper sx={{ p: 3, mt: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{
                                    required: "Le titre est requis",
                                    maxLength: {
                                        value: 255,
                                        message:
                                            "Le titre ne peut pas dépasser 255 caractères",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Titre"
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: "La description est requise",
                                    maxLength: {
                                        value: 5000,
                                        message:
                                            "La description ne peut pas dépasser 5000 caractères",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        rows={6}
                                        label="Description"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid
                            size={12}
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/miniprojects")}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}
