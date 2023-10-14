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
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getUsers();
      setUsers(response);
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
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
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
      if (response.ok) {
        const updatedUsers = await userService.getUsers();
        setUsers(updatedUsers);
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
        label="Search by name"
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
        Add User
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(user._id)}
                    sx={{ marginRight: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
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
        title="Add a new user"
        fields={[
          { label: "Name", value: "name" },
          { label: "Password", value: "password" },
        ]}
      />
    </Container>
  );
};
