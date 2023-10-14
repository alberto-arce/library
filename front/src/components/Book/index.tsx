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
import { IBook } from "./interfaces";
import { bookService } from '../../services';

export const Book = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingBook, setIsAddingBook] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await bookService.getBooks();
      setBooks(response);
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
      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== _id));
      } else {
        console.error("Failed to delete book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleBorrow = (_id: string) => {
    const updatedBooks = books.map((book) => {
      if (book._id === _id && !book.borrowed) {
        return {
          ...book,
          borrowed: true,
          borrowedDate: new Date().toLocaleDateString(),
        };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const handleReturn = (_id: string) => {
    const updatedBooks = books.map((book) => {
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

  const filteredBooks = books.filter((book) =>
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
      if (response.ok) {
        const updatedBooks = await bookService.getBooks();
        setBooks(updatedBooks);
      } else {
        console.error("Failed to create book.");
      }
    } catch (error) {
      console.error("Error creating book:", error);
    }
    handleCloseAddBookDialog();
  };

  return (
    <Container>
      <TextField
        label="Search by Title"
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
        Add Book
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Borrowed</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.borrowed ? "Yes" : "No"}</TableCell>
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
                      onClick={() => handleBorrow(book._id)}
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
        title="Add a New Book"
        fields={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "ISBN", value: "isbn" },
        ]}
      />
    </Container>
  );
}
