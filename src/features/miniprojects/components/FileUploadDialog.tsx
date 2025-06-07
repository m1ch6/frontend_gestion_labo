import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { CloudUpload as UploadIcon } from "@mui/icons-material";

interface Props {
    open: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<void>;
}

export default function FileUploadDialog({ open, onClose, onUpload }: Props) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setUploading(true);
            try {
                await onUpload(selectedFile);
                setSelectedFile(null);
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Téléverser un document</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        border: "2px dashed",
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                    component="label"
                >
                    <input
                        type="file"
                        hidden
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx"
                    />
                    <UploadIcon
                        sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                    />
                    <Typography variant="body1">
                        {selectedFile
                            ? selectedFile.name
                            : "Cliquez pour sélectionner un fichier"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        PDF, DOC, DOCX (Max 10MB)
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    disabled={!selectedFile || uploading}
                >
                    {uploading ? "Téléversement..." : "Téléverser"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
