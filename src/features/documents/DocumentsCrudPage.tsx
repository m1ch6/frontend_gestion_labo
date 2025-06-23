import React from "react";
import EntityCrudPage from "../../components/EntityCrudPage";

const documentFields = [
    { name: "fileName", label: "Nom" },
    { name: "storagePath", label: "Chemin" },
    { name: "size", label: "Taille" },
    {
        name: "type",
        label: "Type de document",
        type: "select",
        options: ["MINIPROJECT", "THESIS", "OTHER"],
        defaultValue: "OTHER",
    },
    { name: "contentType", label: "Type MIME" },
];

const DocumentsPage: React.FC = () => (
    <EntityCrudPage
        entityName="documents"
        endpoint="/documents"
        fields={documentFields}
    />
);

export default DocumentsPage;
