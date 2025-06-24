import React from "react";
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent,
    Grid,
} from "@mui/material";

const steps = [
    {
        label: "Soumission du mémoire",
        description: "L'étudiant soumet le mémoire via l'interface.",
    },
    {
        label: "Vérification des informations",
        description:
            "Le Service Mémoire vérifie les informations et enregistre le document.",
    },
    {
        label: "Enregistrement du document",
        description:
            "Le Service Document enregistre le document dans la base de données.",
    },
    {
        label: "Notification du responsable",
        description:
            "Le Service Notification informe le responsable de la soumission.",
    },
    {
        label: "Validation du mémoire",
        description: "Le responsable valide ou rejette le mémoire.",
    },
    {
        label: "Stockage du fichier",
        description: "Le fichier mémoire est stocké dans le File Storage.",
    },
];

const MemoireSubmissionSequence: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Séquence : Soumission de mémoire
            </Typography>
            <Stepper orientation="vertical" activeStep={-1} sx={{ mb: 4 }}>
                {steps.map((step, idx) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <Typography variant="body2" sx={{ ml: 4, mb: 2 }}>
                            {step.description}
                        </Typography>
                    </Step>
                ))}
            </Stepper>
            <Grid container spacing={2} columns={12}>
                {[
                    "Etudiant",
                    "Service Mémoire",
                    "Service Document",
                    "Service Notification",
                    "Repository",
                    "File Storage",
                ].map((actor) => (
                    <Grid size={4} key={actor}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{actor}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MemoireSubmissionSequence;
