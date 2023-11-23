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
  const [showAlert, setShowAlert] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await memberService.getAll();
      if (response.success) {
        setMembers(response.data);
      } else if (response.status === 404) {
        setMembers([]);
      } else {
        setShowAlert(response.error || "Error inesperado");
      }
    } catch (error) {
      setShowAlert("Error inesperado");
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
        fetchData();
      } else {
        setShowAlert("No se pudo agregar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
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
        fetchData();
      } else {
        setShowAlert("No se pudo actualizar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
    }
    setIsEditing(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await memberService.delete(_id);
      if (response.success) {
        fetchData();
      } else {
        const error = response.error ?? "unexpected error";
        setShowAlert(error);
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
    }
  };

  const handleActivate = async (_id: string) => {
    try {
      const response = await memberService.changeStatus(_id);
      if (response.success) {
        fetchData();
      } else {
        setShowAlert("No se pudo activar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
    }
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
        color="primary"
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
                        color="primary"
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
                        color="secondary"
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
      {showAlert && typeof showAlert === "string" && (
        <Alert message={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </Container>
  );
};
