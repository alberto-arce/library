import { useState, useEffect } from "react";
import { borrowService } from "../../services";
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
} from "@mui/material";

import { IBorrow } from "./interfaces";

export const Borrow = () => {
  const [borrows, setBorrows] = useState<IBorrow[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await borrowService.getBorrows();
      setBorrows(response?.data);
    };
    fetchData();
  }, []);

  // const filteredBorrows = borrows.filter((borrow) =>
  //   borrow.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleDelete = (_id: string) => {
    console.log("Function not implemented.", _id);
  };

  return (
    <Container>
      <TextField
        label="Search by book"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows?.map((borrow, index) => (
              <TableRow key={index}>
                <TableCell>{borrow.book}</TableCell>
                <TableCell>{borrow.member}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(borrow._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
