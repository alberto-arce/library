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
  TextField,
} from "@mui/material";

import { AddItemDialog } from "../AddItemDialog";
import { IUser } from "./interfaces";
import { userService } from "../../services";

export const User = () => {
  const [users, setUsers] = useState<IUser[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getUsers();
      setUsers(response?.data);
    };
    fetchData();
  }, []);

  const handleEdit = (_id: string) => {
    // Implement edit logic here
    console.log(`Edit user with ID: ${_id}`);
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

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddUserDialog = () => {
    setIsAddingUser(true);
  };

  const handleCloseAddUserDialog = () => {
    setIsAddingUser(false);
  };

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

  return (
    <Container>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
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
            {filteredUsers?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(user._id)}
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
    </Container>
  );
};
