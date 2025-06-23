import {
    getStudents,
    createStudent,
    deleteStudent,
    Student,
} from "./services/studentApi";
import React, { useCallback } from "react";
import EntityCrudPage from "../../components/EntityCrudPage";

const studentFields = [
    { name: "firstName", label: "Prénom" },
    { name: "lastName", label: "Nom" },
    { name: "email", label: "Email" },
    { name: "username", label: "Nom d'utilisateur" },
    { name: "password", label: "Mot de passe", type: "password" },
];

const StudentsPage: React.FC = () => {
    // Handlers using the studentApi CRUD functions
    const fetchEntities = useCallback(() => getStudents(), []);
    const addEntity = useCallback(
        (data: Partial<Student>) => createStudent(data as Student),
        []
    );
    const removeEntity = useCallback((id: number) => deleteStudent(id), []);

    return (
        <EntityCrudPage
            entityName="étudiants"
            endpoint="/students"
            fields={studentFields}
            fetchEntities={fetchEntities}
            addEntity={addEntity}
            removeEntity={removeEntity}
        />
    );
};

export default StudentsPage;
