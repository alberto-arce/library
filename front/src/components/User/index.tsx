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
import { IUser } from "./interfaces";
import { userService } from "../../services";
import { EditItemDialog } from "../EditItemDialog";
import { Alert } from "../Alert";

export const User = () => {
  const [users, setUsers] = useState<IUser[] | undefined>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [showAlert, setShowAlert] = useState<string | boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getAll();
      setUsers(response?.data);
    };
    fetchData();
  }, []);

  const handleSaveNewUser = async (newUser: IUser) => {
    try {
      const response = await userService.create(newUser);
      if (response.success) {
        const response = await userService.getAll();
        setUsers(response?.data);
      } else {
        setShowAlert("No se pudo agregar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
    }
    handleCloseAddUserDialog();
  };

  const handleEdit = (user: IUser) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedUser: IUser) => {
    try {
      const response = await userService.update(editedUser._id, editedUser);
      if (response.success) {
        const updatedUsers = await userService.getAll();
        setUsers(updatedUsers.data);
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
      const response = await userService.delete(_id);
      if (response.success) {
        setUsers((prevUsers) => prevUsers?.filter((user) => user._id !== _id));
      } else {
        setShowAlert("No se pudo eliminar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
    }
  };

  const handleOpenAddUserDialog = () => {
    setIsAddingUser(true);
  };

  const handleCloseAddUserDialog = () => {
    setIsAddingUser(false);
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddUserDialog}
        style={{ marginBottom: "20px" }}
      >
        Agregar usuario
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(user)}
                    sx={{ marginRight: 2 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(user._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <AddItemDialog
        open={isAddingUser}
        onClose={handleCloseAddUserDialog}
        onSave={handleSaveNewUser}
        title="Agregar un usuario"
        fields={[
          { label: "Nombre", value: "name" },
          { label: "Contraseña", value: "password" },
        ]}
      />
      <EditItemDialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
        title="Editar usuario"
        fields={[{ label: "Nombre", value: "name" }]}
        initialData={editUser}
      />
      {showAlert && typeof showAlert === "string" && (
        <Alert message={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </Container>
  );
};
