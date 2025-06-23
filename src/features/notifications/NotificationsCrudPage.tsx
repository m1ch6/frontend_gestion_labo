import React from "react";
import EntityCrudPage from "../../components/EntityCrudPage";

const notificationFields = [
    {
        name: "type",
        label: "Type",
        type: "select",
        options: ["SYSTEM", "MINIPROJECT", "THESIS", "DEFENSE"],
        defaultValue: "SYSTEM",
    },
    { name: "title", label: "Titre" },
    { name: "message", label: "Message" },
    { name: "read", label: "Lu", type: "checkbox" },
];

const NotificationsPage: React.FC = () => (
    <EntityCrudPage
        entityName="notifications"
        endpoint="/notifications"
        fields={notificationFields}
    />
);

export default NotificationsPage;
