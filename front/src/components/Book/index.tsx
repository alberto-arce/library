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
    } catch (error) {
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
        text: "¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showConfirmButton: true,
        confirmButtonText: "Si, eliminar",
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
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    }
  };

  const handleOpenAddBookDialog = () => {
    setIsAddingBook(true);
  };

  const handleCloseAddBookDialog = () => {
    setIsAddingBook(false);
  };

  const openBorrowModal = (book: IBook) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const closeBorrowModal = () => {
    setIsBorrowModalOpen(false);
  };

  const handleBookBorrowed = async () => {
    fetchData();
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenAddBookDialog}
        style={{ marginBottom: "20px" }}
      >
        Agregar libro
      </Button>
      {!isLoading && !books?.length && <NotFoundImage />}
      {!isLoading && books && books.length > 0 && (
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Préstamo externo</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.stock}</TableCell>
                    <TableCell>{book.externalBorrow.toUpperCase()}</TableCell>
                    <TableCell>
                      <Button
                        disabled={book.stock ? false : true}
                        variant="contained"
                        color="secondary"
                        onClick={() => openBorrowModal(book)}
                        sx={{ marginRight: 2 }}
                      >
                        Prestar
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleEdit(book)}
                        sx={{ marginRight: 2 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(book._id)}
                      >
                        Eliminar
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
