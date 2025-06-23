import React from "react";
import EntityCrudPage from "../../components/EntityCrudPage";

const soutenanceFields = [
    {
        name: "defenseDate",
        label: "Date de soutenance",
        type: "datetime-local",
    },
    { name: "location", label: "Lieu" },
    // Jury and thesis should be selected from existing entities, but for now, use text fields for demo
    { name: "jury", label: "Jury (IDs séparés par des virgules)" },
    { name: "thesis", label: "ID du mémoire" },
];

const SoutenancesPage: React.FC = () => (
    <EntityCrudPage
        entityName="soutenances"
        endpoint="/soutenances"
        fields={soutenanceFields}
    />
);

export default SoutenancesPage;
