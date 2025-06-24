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
        label: "Nouveau Miniprojet",
        description:
            "L'étudiant clique sur 'Nouveau Miniprojet' pour démarrer la soumission.",
    },
    {
        label: "Remplir infos et uploader document",
        description: "L'étudiant remplit le formulaire et ajoute le document.",
    },
    {
        label: "Validation des données",
        description: "Le contrôleur valide les données du projet.",
    },
    {
        label: "Création du miniprojet",
        description:
            "Le service crée le miniprojet et l'enregistre en base de données.",
    },
    {
        label: "Notification",
        description:
            "Une notification de soumission est générée et enregistrée.",
    },
    {
        label: "Confirmation ou erreurs",
        description:
            "L'étudiant reçoit une confirmation ou des messages d'erreur selon le cas.",
    },
];

const actors = [
    "Etudiant",
    "IHM",
    "Controller",
    "Service",
    "Repository",
    "BDD",
];

const MiniProjetSubmissionSequence: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Séquence : Soumission de Mini-Projet
            </Typography>
            <Stepper orientation="vertical" activeStep={-1} sx={{ mb: 4 }}>
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <Typography variant="body2" sx={{ ml: 4, mb: 2 }}>
                            {step.description}
                        </Typography>
                    </Step>
                ))}
            </Stepper>
            <Grid container spacing={2} columns={12}>
                {actors.map((actor) => (
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

export default MiniProjetSubmissionSequence;
