import { useState, useEffect, useMemo } from "react";
import { Container, Button, Paper, Grid, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddItemDialog } from "../AddItemDialog";
import { BorrowModal } from "../BorrowModal";
import { IBook } from "./interfaces";
import { bookService } from "../../services";
import { EditItemDialog } from "../EditItemDialog";
import { Alert } from "../Alert";
import { NotFoundImage } from "../NotFoundImage";

export const Book = () => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[] | undefined>(undefined);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState<boolean>(false);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await bookService.getAll();
      if (response.success) {
        setBooks(response.data);
      } else if (response.status === 404) {
        setBooks([]);
      } else {
        Alert({
          type: "error",
          title: "Error al obtener los Libros",
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

  const filteredBooks = useMemo(() => {
    return books?.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  const handleSaveNewBook = async (newBook: IBook) => {
    try {
      const response = await bookService.create(newBook);
      if (response.success) {
        Alert({
          type: "success",
          title: "Libro Agregado",
          text: "El libro ha sido agregado exitosamente.",
          timer: 2000,
        });
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Agregar Libro Fallido",
          text: "No se pudo agregar el libro. Por favor, inténtalo de nuevo.",
        });
      }
    } catch {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un error. Intentarlo más tarde",
      });
    }
    handleCloseAddBookDialog();
  };

  const handleEdit = (book: IBook) => {
    setEditBook(book);
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedBook: IBook) => {
    try {
      const response = await bookService.update(editedBook._id, editedBook);
      if (response.success) {
        Alert({
          type: "success",
          title: "Cambios Guardados",
          text: "Los cambios en el libro se han guardado correctamente.",
          timer: 2000,
        });
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Error al Editar Libro",
          text: "No se pudieron guardar los cambios. Inténtalo nuevamente.",
          timer: 2000
        });
      }
    } catch {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
        timer: 2000
      });
    }
    setIsEditing(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      Alert({
        type: "warning",
        title: "Confirmar Eliminación",
        text: "¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showConfirmButton: true,
        confirmButtonText: "Sí, eliminar",
        position: "center",
        onConfirm: async () => {
          const response = await bookService.delete(_id);
          if (response.success) {
            fetchData();
            Alert({
              type: "success",
              title: "Libro Eliminado",
              text: "El libro ha sido eliminado exitosamente.",
              timer: 2000,
            });
          } else {
            Alert({
              type: "error",
              title: "Error al Eliminar Libro",
              text: "No se pudo eliminar el libro. Inténtalo de nuevo más tarde.",
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

  const handleOpenAddBookDialog = () => setIsAddingBook(true);
  const handleCloseAddBookDialog = () => setIsAddingBook(false);

  const openBorrowModal = (book: IBook) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const closeBorrowModal = () => setIsBorrowModalOpen(false);

  const handleBookBorrowed = async () => fetchData();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Título",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "author",
      headerName: "Autor",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Categoría",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "isbn",
      headerName: "ISBN",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Cantidad",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "externalBorrow",
      headerName: "Préstamo externo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => params.value.toUpperCase(),
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <Button
            disabled={!params.row.stock}
            variant="contained"
            color="secondary"
            onClick={() => openBorrowModal(params.row)}
            sx={{ marginRight: 2 }}
          >
            Prestar
          </Button>
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
            label="Buscar por título"
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
            onClick={handleOpenAddBookDialog}
            fullWidth
            style={{ height: 55 }}
          >
            Agregar libro
          </Button>
        </Grid>
      </Grid>
      {!isLoading && !books?.length && <NotFoundImage />}
      {!isLoading && books && books.length > 0 && (
        <Paper style={{ height: "auto" }}>
          <DataGrid
            rows={filteredBooks?.map((book, index) => ({
              id: index,
              _id: book._id,
              title: book.title,
              author: book.author,
              category: book.category,
              isbn: book.isbn,
              stock: book.stock,
              externalBorrow: book.externalBorrow,
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
        open={isAddingBook}
        onClose={handleCloseAddBookDialog}
        onSave={handleSaveNewBook}
        title="Agregar libro"
        fields={[
          { label: "Título", value: "title" },
          { label: "Autor", value: "author" },
          { label: "Categoría", value: "category" },
          { label: "ISBN", value: "isbn" },
          { label: "Cantidad", value: "stock" },
          { label: "Préstamo externo", value: "externalBorrow" },
        ]}
      />
      <EditItemDialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
        title="Editar libro"
        fields={[
          { label: "Título", value: "title" },
          { label: "Autor", value: "author" },
          { label: "Categoría", value: "category" },
          { label: "Cantidad", value: "stock" },
        ]}
        initialData={editBook}
      />
      <BorrowModal
        isOpen={isBorrowModalOpen}
        onClose={closeBorrowModal}
        selectedBook={selectedBook}
        onBookBorrowed={handleBookBorrowed}
      />
    </Container>
  );
};
