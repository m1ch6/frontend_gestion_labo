import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Rating,
    Typography,
} from "@mui/material";
import { evaluateMiniproject } from "../services/miniprojectApi";
import { EvaluationDTO } from "../../../types";

interface Props {
    open: boolean;
    onClose: () => void;
    miniprojectId: number;
    onSuccess: () => void;
}

export default function EvaluationDialog({
    open,
    onClose,
    miniprojectId,
    onSuccess,
}: Props) {
    const [grade, setGrade] = useState<number>(10);
    const [feedback, setFeedback] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const evaluation: EvaluationDTO = { grade, feedback };
            await evaluateMiniproject(miniprojectId, evaluation);
            onSuccess();
            setGrade(10);
            setFeedback("");
        } catch (error) {
            console.error("Evaluation failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Évaluer le miniprojet</DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Note sur 20
                    </Typography>
                    <TextField
                        type="number"
                        fullWidth
                        value={grade}
                        onChange={(e) => setGrade(Number(e.target.value))}
                        inputProps={{ min: 0, max: 20, step: 0.5 }}
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="subtitle1" gutterBottom>
                        Commentaires
                    </Typography>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Feedback pour l'étudiant..."
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={submitting}
                >
                    {submitting ? "Envoi..." : "Évaluer"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
