import { useState, useEffect, useMemo } from "react";
import { Container, Button, Paper, TextField, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddItemDialog } from "../AddItemDialog";
import { IUser } from "./interfaces";
import { userService } from "../../services";
import { EditItemDialog } from "../EditItemDialog";
import { Alert } from "../Alert";
import { NotFoundImage } from "../NotFoundImage";

export const User = () => {
  const [users, setUsers] = useState<IUser[] | undefined>(undefined);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await userService.getAll();
      if (response.success) {
        setUsers(response.data);
      } else if (response.status === 404) {
        setUsers([]);
      } else {
        Alert({
          type: "error",
          title: "Error al obtener los usuarios",
          text: "Por favor, intenta de nuevo más tarde",
          timer: 2000,
        });
      }
    } catch {
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
  
  const filteredUsers = useMemo(() => {
    return users?.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleSaveNewUser = async (newUser: IUser) => {
    try {
      const response = await userService.create(newUser);
      if (response.success) {
        Alert({
          type: "success",
          title: "Usuario Agregado",
          text: "El nuevo usuario ha sido añadido exitosamente.",
          timer: 2000,
        });
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Error al Agregar Usuario",
          text: "No se pudo agregar el usuario. Por favor, inténtalo de nuevo más tarde.",
          timer: 2000,
        });
      }
    } catch {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
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
        Alert({
          type: "success",
          title: "Cambios Guardados",
          text: "Los cambios en el usuario se han guardado exitosamente.",
          timer: 2000,
        });
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Error al Editar Usuario",
          text: "No se pudieron guardar los cambios. Por favor, inténtalo de nuevo más tarde.",
          timer: 2000,
        });
      }
    } catch {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    }
    setIsEditing(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      Alert({
        type: "warning",
        title: "Confirmar Eliminación",
        text: "¿Estás seguro de que quieres eliminar a este usuario? Esta acción no se puede deshacer",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showConfirmButton: true,
        confirmButtonText: "Sí, eliminar",
        position: "center",
        onConfirm: async () => {
          const response = await userService.delete(_id);
          if (response.success) {
            fetchData();
            Alert({
              type: "success",
              title: "Usuario Eliminado",
              text: "El usuario ha sido eliminado correctamente.",
              timer: 2000,
            });
          } else {
            Alert({
              type: "error",
              title: "Error al Eliminar Usuario",
              text: "No se pudo eliminar el usuario. Por favor, inténtalo de nuevo más tarde.",
              timer: 2000,
            });
          }
        },
      });
    } catch {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    }
  };

  const handleOpenAddUserDialog = () => setIsAddingUser(true);
  const handleCloseAddUserDialog = () => setIsAddingUser(false);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      editable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleEdit(params.row)}
            sx={{ marginRight: 2 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: 20 }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: 0 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenAddUserDialog}
            fullWidth
            style={{ height: 55 }}
          >
            Agregar usuario
          </Button>
        </Grid>
      </Grid>
      {!isLoading && !users?.length && <NotFoundImage />}
      {!isLoading && users && users.length > 0 && (
        <Paper style={{ height: "auto" }}>
          <DataGrid
            rows={filteredUsers?.map((user, index) => ({
              id: index,
              _id: user._id,
              name: user.name,
            }))}
            columns={columns}
            pageSizeOptions={[10, 25, 50, 100]}
            autoHeight
            disableColumnResize
            disableRowSelectionOnClick
            disableDensitySelector
          />
        </Paper>
      )}
      <AddItemDialog
        open={isAddingUser}
        onClose={handleCloseAddUserDialog}
        onSave={handleSaveNewUser}
        title="Agregar usuario"
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
