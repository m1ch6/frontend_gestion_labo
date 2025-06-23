import React from "react";
import EntityCrudPage from "../../components/EntityCrudPage";

const miniprojectFields = [
    { name: "titre", label: "Titre" },
    { name: "description", label: "Description" },
    { name: "dateSubmission", label: "Date de soumission", type: "date" },
    { name: "statut", label: "Statut" },
    { name: "note", label: "Note" },
    { name: "commentaires", label: "Commentaires" },
];

const MiniprojectsPage: React.FC = () => (
    <EntityCrudPage
        entityName="miniprojets"
        endpoint="/miniprojects"
        fields={miniprojectFields}
    />
);

export default MiniprojectsPage;
