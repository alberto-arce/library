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
import { BorrowModal } from "../BorrowModal"; // Import the BorrowModal component
import { IBook } from "./interfaces";
import { bookService } from "../../services";

export const Book = () => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[] | undefined>([]);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await bookService.getBooks();
      setBooks(response?.data);
    };
    fetchData();
  }, []);

  const handleEdit = (_id: string) => {
    // Implement edit logic here
    console.log(`Edit book with ID: ${_id}`);
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

  const handleReturn = (_id: string) => {
    const updatedBooks = books?.map((book) => {
      if (book._id === _id && book.borrowed) {
        return {
          ...book,
          borrowed: false,
          borrowedDate: undefined,
        };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddBookDialog = () => {
    setIsAddingBook(true);
  };

  const handleCloseAddBookDialog = () => {
    setIsAddingBook(false);
  };

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
      <TextField
        label="Buscar por título"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
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
              <TableCell>ISBN</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks?.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell>
                  {book.borrowed ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleReturn(book._id)}
                      sx={{ marginRight: 2 }}
                    >
                      Return
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openBorrowModal(book)}
                      sx={{ marginRight: 2 }}
                    >
                      Borrow
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(book._id)}
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
          { label: "ISBN", value: "isbn" },
          { label: "cantidad", value: "stock" },
        ]}
      />
      <BorrowModal
        isOpen={isBorrowModalOpen}
        onClose={closeBorrowModal}
        selectedBook={selectedBook}
      />
    </Container>
  );
};
