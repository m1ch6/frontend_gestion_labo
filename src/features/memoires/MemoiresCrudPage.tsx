import React from "react";
import EntityCrudPage from "../../components/EntityCrudPage";

const memoireFields = [
    { name: "titre", label: "Titre" },
    { name: "resume", label: "Résumé" },
    { name: "motsCles", label: "Mots-clés" },
    { name: "dateDepot", label: "Date de dépôt", type: "date" },
    { name: "version", label: "Version" },
    { name: "statut", label: "Statut" },
    { name: "noteSoutenance", label: "Note de soutenance" },
];

const MemoiresPage: React.FC = () => (
    <EntityCrudPage
        entityName="mémoires"
        endpoint="/memoires"
        fields={memoireFields}
    />
);

export default MemoiresPage;
