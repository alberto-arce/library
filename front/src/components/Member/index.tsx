import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";

import { AddItemDialog } from "../AddItemDialog";
import { EditItemDialog } from "../EditItemDialog";
import { IMember } from "./interfaces";
import { memberService } from "../../services";
import { Alert } from "../Alert";
import { NotFoundImage } from "../NotFoundImage";

export const Member = () => {
  const [members, setMembers] = useState<IMember[] | undefined>(undefined);
  const [isAddingMember, setisAddingMember] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMember, setEditMember] = useState<IMember | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await memberService.getAll();
      if (response.success) {
        setMembers(response.data);
      } else if (response.status === 404) {
        setMembers([]);
      } else {
        Alert({
          type: "error",
          title: "Error al obtener los socios",
          text: "Por favor, intenta de nuevo más tarde",
          timer: 2000,
        });
      }
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveNewMember = async (newMember: IMember) => {
    try {
      const response = await memberService.create(newMember);
      if (response.success) {
        Alert({
          type: "success",
          title: "Socio Agregado",
          text: "El socio ha sido agregado exitosamente.",
          timer: 2000,
        });
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Error al agregar Socio",
          text: "No se pudo agregar el socio. Por favor, intenta de nuevo más tarde.",
          timer: 2000,
        });
      }
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
        timer: 2000,
      });
    }
    handleCloseAddMemberDialog();
  };

  const handleEdit = (member: IMember) => {
    setEditMember(member);
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedMember: IMember) => {
    try {
      const response = await memberService.update(
        editedMember._id,
        editedMember
      );
      if (response.success) {
        Alert({
          type: "success",
          title: "Cambios Guardados",
          text: "Los cambios en el socio se han guardado correctamente.",
          timer: 2000,
        });
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Error al Editar Socio",
          text: "No se pudieron guardar los cambios. Por favor, intenta de nuevo.",
          timer: 2000,
        });
      }
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
      });
    }
    setIsEditing(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      Alert({
        type: "warning",
        title: "Confirmar Eliminación",
        text: "¿Estás seguro de que deseas eliminar a este socio? Esta acción no se puede deshacer.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showConfirmButton: true,
        confirmButtonText: "Si, eliminar",
        position: "center",
        onConfirm: async () => {
          const response = await memberService.delete(_id);
          if (response.success) {
            fetchData();
            Alert({
              type: "success",
              title: "Socio Eliminado",
              text: "El socio ha sido eliminado exitosamente.",
              timer: 2000,
            });
          } else {
            Alert({
              type: "error",
              title: "Error al Eliminar Socio",
              text: "No se pudo eliminar el socio. Por favor, intenta de nuevo más tarde.",
              timer: 2000,
            });
          }
        },
      });
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
        timer: 2000,
      });
    }
  };

  const handleActivate = async (_id: string) => {
    Alert({
      type: "warning",
      title: "Confirmar Activación",
      text: "¿Estás seguro de que deseas activar a este socio?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showConfirmButton: true,
      confirmButtonText: "Sí, activar",
      position: "center",
      onConfirm: async () => {
        try {
          const response = await memberService.changeStatus(_id);
          if (response.success) {
            Alert({
              type: "success",
              title: "Socio Activado",
              text: "El socio ha sido activado exitosamente.",
              timer: 2000,
            });
            fetchData();
          } else {
            Alert({
              type: "error",
              title: "Error al Activar Socio",
              text: "No se pudo activar al socio. Por favor, intenta de nuevo más tarde.",
              timer: 2000,
            });
          }
        } catch (error) {
          Alert({
            type: "error",
            title: "Oops...",
            text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
            timer: 2000,
          });
        }
      },
    });
  };
  
  const handleOpenAddMemberDialog = () => {
    setisAddingMember(true);
  };

  const handleCloseAddMemberDialog = () => {
    setisAddingMember(false);
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenAddMemberDialog}
        style={{ marginBottom: "20px" }}
      >
        Agregar socio
      </Button>
      {!isLoading && !members?.length && <NotFoundImage />}
      {!isLoading && members && members.length > 0 && (
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members?.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.status.toUpperCase()}</TableCell>
                    <TableCell>
                      <Button
                        disabled={
                          member.status.toLowerCase() === "bloqueado"
                            ? true
                            : false
                        }
                        variant="contained"
                        color="warning"
                        onClick={() => handleEdit(member)}
                        sx={{ marginRight: 2 }}
                      >
                        Editar
                      </Button>
                      <Button
                        disabled={
                          member.status.toLowerCase() === "bloqueado"
                            ? true
                            : false
                        }
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(member._id)}
                        sx={{ marginRight: 2 }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        disabled={
                          member.status.toLowerCase() === "activado"
                            ? true
                            : false
                        }
                        variant="contained"
                        color="secondary"
                        onClick={() => handleActivate(member._id)}
                      >
                        Activar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
      <AddItemDialog
        open={isAddingMember}
        onClose={handleCloseAddMemberDialog}
        onSave={handleSaveNewMember}
        title="Agregar socio"
        fields={[{ label: "Nombre", value: "name" }]}
      />
      <EditItemDialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
        title="Editar socio"
        fields={[{ label: "Nombre", value: "name" }]}
        initialData={editMember}
      />
    </Container>
  );
};
