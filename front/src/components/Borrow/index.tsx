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
  console.log(borrows);
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
        label="Buscar por nombre"
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
              <TableCell>Libro</TableCell>
              <TableCell>Socio</TableCell>
              <TableCell>Fecha de préstamo</TableCell>
              <TableCell>Fecha de entrega</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows?.map((borrow, index) => (
              <TableRow key={index}>
                <TableCell>{borrow.book.title}</TableCell>
                <TableCell>{borrow.member.name}</TableCell>
                <TableCell>{new Date(borrow.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {borrow.deletedAt
                    ? new Date(borrow.deletedAt).toLocaleDateString()
                    : "No Entregado"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(borrow._id)}
                  >
                    Delivery
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
