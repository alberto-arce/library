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

export const Book = () => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[] | undefined>([]);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState<boolean>(false);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [showAlert, setShowAlert] = useState<string | boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await bookService.getAll();
      setBooks(response?.data);
    };
    fetchData();
  }, []);

  const handleSaveNewBook = async (newBook: IBook) => {
    try {
      const response = await bookService.create(newBook);
      if (response.success) {
        const response = await bookService.getAll();
        setBooks(response?.data);
      } else {
        setShowAlert("No se pudo agregar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
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
        const updatedBooks = await bookService.getAll();
        setBooks(updatedBooks.data);
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
      const response = await bookService.delete(_id);
      if (response.success) {
        setBooks((prevBooks) => prevBooks?.filter((book) => book._id !== _id));
      } else {
        setShowAlert("No se pudo eliminar");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
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
    const response = await bookService.getAll();
    setBooks(response?.data);
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddBookDialog}
        style={{ marginBottom: "20px" }}
      >
        Agregar libro
      </Button>
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
                    color="primary"
                    onClick={() => openBorrowModal(book)}
                    sx={{ marginRight: 2 }}
                  >
                    Prestar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(book)}
                    sx={{ marginRight: 2 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
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
      <AddItemDialog
        open={isAddingBook}
        onClose={handleCloseAddBookDialog}
        onSave={handleSaveNewBook}
        title="Agregar un libro"
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
      {showAlert && typeof showAlert === "string" && (
        <Alert message={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </Container>
  );
};
