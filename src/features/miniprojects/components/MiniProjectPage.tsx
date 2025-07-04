import { Routes, Route } from "react-router-dom";
import EntityCrudPage from "../../../components/EntityCrudPage";

const miniprojectFields = [
    { name: "titre", label: "Titre" },
    { name: "description", label: "Description" },
    { name: "dateSubmission", label: "Date de soumission", type: "date" },
    { name: "statut", label: "Statut" },
    { name: "note", label: "Note" },
    { name: "commentaires", label: "Commentaires" },
];

export default function MiniProjectPage() {
    return (
        <EntityCrudPage
            entityName="miniprojets"
            endpoint="/miniprojects"
            fields={miniprojectFields}
        />
    );
}
