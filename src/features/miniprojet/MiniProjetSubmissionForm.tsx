import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Alert,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const initialState = {
    titre: "",
    description: "",
    file: undefined as File | undefined,
};

const MiniProjetSubmissionForm: React.FC = () => {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const data = new FormData();
        data.append("titre", form.titre);
        data.append("description", form.description);
        if (form.file) data.append("file", form.file);
        try {
            // Adjust the endpoint as needed
            await axios.post("/api/miniprojects", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccess("Projet soumis avec succès !");
            setForm(initialState);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Erreur lors de la soumission."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Soumettre un Miniprojet
                    </Typography>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <TextField
                            label="Titre"
                            name="titre"
                            value={form.titre}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={3}
                            sx={{ mb: 2 }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 2,
                            }}
                        >
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<UploadFileIcon />}
                                sx={{ textTransform: "none" }}
                            >
                                <input
                                    type="file"
                                    name="file"
                                    hidden
                                    accept="application/pdf"
                                    onChange={handleChange}
                                />
                                {form.file ? (form.file as File).name : ""}
                            </Button>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Soumettre"
                                )}
                            </Button>
                        </Box>
                        {success && <Alert severity="success">{success}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default MiniProjetSubmissionForm;
