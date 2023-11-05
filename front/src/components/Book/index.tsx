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
import { BorrowModal } from "../BorrowModal"; // Import the BorrowModal component
import { IBook } from "./interfaces";
import { bookService } from "../../services";
import { EditItemDialog } from "../EditItemDialog";

export const Book = () => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[] | undefined>([]);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState<boolean>(false);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBook, setEditBook] = useState<IBook | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await bookService.getBooks();
      setBooks(response?.data);
    };
    fetchData();
  }, []);

  const handleSaveNewBook = async (newBook: IBook) => {
    try {
      const response = await bookService.createBook(newBook);
      if (response.success) {
        const response = await bookService.getBooks();
        setBooks(response?.data);
      } else {
        console.error("Failed to create book.");
      }
    } catch (error) {
      console.error("Error creating book:", error);
    }
    handleCloseAddBookDialog();
  };

  const handleEdit = (book: IBook) => {
    setEditBook(book);
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedBook: IBook) => {
    try {
      const response = await bookService.updateBook(editedBook._id, editedBook);
      if (response.success) {
        const updatedBooks = await bookService.getBooks();
        setBooks(updatedBooks.data);
      } else {
        console.error("Failed to update book.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
    setIsEditing(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await bookService.deleteBook(_id);
      if (response.success) {
        setBooks((prevBooks) => prevBooks?.filter((book) => book._id !== _id));
      } else {
        console.error("Failed to delete book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
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
    setIsBorrowModalOpen(true);
  };

  const closeBorrowModal = () => {
    setIsBorrowModalOpen(false);
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
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openBorrowModal(book)}
                    sx={{ marginRight: 2 }}
                  >
                    Borrow
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(book)}
                    sx={{ marginRight: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(book._id)}
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
      />
    </Container>
  );
};
