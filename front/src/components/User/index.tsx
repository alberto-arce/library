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

export const User = () => {
  const [users, setUsers] = useState<IUser[] | undefined>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getUsers();
      setUsers(response?.data);
    };
    fetchData();
  }, []);

  const handleSaveNewUser = async (newUser: IUser) => {
    try {
      const response = await userService.createUser(newUser);
      if (response.success) {
        const response = await userService.getUsers();
        setUsers(response?.data);
      } else {
        console.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
    handleCloseAddUserDialog();
  };

  const handleEdit = (user: IUser) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedUser: IUser) => {
    try {
      const response = await userService.updateUser(
        editedUser._id,
        editedUser
      );
      if (response.success) {
        const updatedUsers = await userService.getUsers();
        setUsers(updatedUsers.data);
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    setIsEditing(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await userService.deleteUser(_id);
      if (response.success) {
        setUsers((prevUsers) => prevUsers?.filter((user) => user._id !== _id));
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
    </Container>
  );
};
