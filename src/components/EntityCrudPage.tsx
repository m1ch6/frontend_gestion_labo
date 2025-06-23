import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../services/api";

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
}

interface EntityCrudPageProps<T> {
    entityName: string;
    endpoint: string;
    fields: FieldConfig[];
    idField?: keyof T;
    fetchEntities?: () => Promise<T[]>;
    addEntity?: (data: Partial<T>) => Promise<T>;
    removeEntity?: (id: number) => Promise<void>;
}

function EntityCrudPage<T extends { [key: string]: any }>({
    entityName,
    endpoint,
    fields,
    idField = "id" as keyof T,
    fetchEntities: fetchEntitiesProp,
    addEntity: addEntityProp,
    removeEntity: removeEntityProp,
}: EntityCrudPageProps<T>) {
    const [entities, setEntities] = useState<T[]>([]);
    const [form, setForm] = useState<Partial<T>>({});
    const [loading, setLoading] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState<any>(null);

    const fetchEntities = async () => {
        setLoading(true);
        try {
            let data;
            if (fetchEntitiesProp) {
                data = await fetchEntitiesProp();
            } else {
                const res = await api.get(endpoint);
                data = res.data;
            }
            setEntities(data);
        } catch (e) {
            setEntities([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEntities();
    }, [endpoint]);

    const handleChange = (name: keyof T, value: T[keyof T]) => {
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleAdd = async () => {
        if (fields.some((f) => !form[f.name as keyof T])) return;
        try {
            if (addEntityProp) {
                await addEntityProp(form);
            } else {
                await api.post(endpoint, form);
            }
            setForm({});
            fetchEntities();
        } catch (e) {
            alert("Erreur lors de l'ajout");
        }
    };

    const handleReloadToForm = (entity: T) => {
        setForm({ ...entity });
        setIsUpdateMode(true);
        // Use the correct id field from the entity
        setUpdateId(entity[idField]);
    };

    const handleUpdate = async () => {
        if (fields.some((f) => !form[f.name as keyof T])) return;
        if (!updateId) {
            alert("Aucun ID trouvé pour la mise à jour.");
            return;
        }
        try {
            // Remove backend-managed/security fields from the payload, but keep version and password
            const forbiddenFields = [
                "authorities",
                "accountNonExpired",
                "accountNonLocked",
                "credentialsNonExpired",
                "enabled",
                "createdAt",
                "updatedAt",
                "notifications",
            ];
            const filteredForm = Object.fromEntries(
                Object.entries(form).filter(
                    ([key]) => !forbiddenFields.includes(key)
                )
            );
            await api.put(`${endpoint}/${updateId}`, filteredForm);
            setForm({});
            setIsUpdateMode(false);
            setUpdateId(null);
            fetchEntities();
        } catch (e) {
            alert("Erreur lors de la modification");
        }
    };

    const handleDelete = async (id: any) => {
        if (!id) {
            alert("Aucun ID trouvé pour la suppression.");
            return;
        }
        try {
            if (removeEntityProp) {
                await removeEntityProp(id);
            } else {
                await api.delete(`${endpoint}/${id}`);
            }
            fetchEntities();
        } catch (e) {
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <Box maxWidth={"100%"} mx="auto" mt={4} px={4} width="100%">
            <Typography variant="h4" gutterBottom>
                Gestion des {entityName}
            </Typography>
            <Box display="flex" gap={2} mb={2} flexWrap="wrap">
                {fields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        value={form[field.name as keyof T] || ""}
                        onChange={(e) =>
                            handleChange(
                                field.name as keyof T,
                                e.target.value as any
                            )
                        }
                        type={field.type || "text"}
                        sx={{ minWidth: 180, flex: 1 }}
                    />
                ))}
                <Button
                    variant="contained"
                    onClick={isUpdateMode ? handleUpdate : handleAdd}
                    sx={{
                        height: 56,
                        alignSelf: "center",
                    }}
                >
                    {isUpdateMode ? "Update" : "Ajouter"}
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {fields.map((field) => (
                                <TableCell
                                    key={field.name}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {field.label}
                                </TableCell>
                            ))}
                            <TableCell></TableCell> {/* For actions */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map((entity) => (
                            <TableRow key={entity[idField] as any}>
                                {fields.map((field) => (
                                    <TableCell key={field.name}>
                                        {entity[field.name]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        edge="end"
                                        aria-label="reload"
                                        onClick={() =>
                                            handleReloadToForm(entity)
                                        }
                                    >
                                        <RefreshIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            handleDelete(entity[idField])
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <Typography>Chargement...</Typography>}
        </Box>
    );
}

export default EntityCrudPage;
