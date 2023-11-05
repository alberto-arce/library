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
} from "@mui/material";

import { IBorrow } from "./interfaces";

export const Borrow = () => {
  const [borrows, setBorrows] = useState<IBorrow[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await borrowService.getBorrows();
      setBorrows(response?.data);
    };
    fetchData();
  }, []);

  /**
   * TODO: alert modal responses
   */
  const handleDelete = async (_id: string) => {
    try {
      const response = await borrowService.deleteBorrow(_id);
      if (response.success) {
        const response = await borrowService.getBorrows();
        setBorrows(response.data);
      } else {
        console.error("Failed to delete borrow.");
      }
    } catch (error) {
      console.error("Error deleting borrow:", error);
    }
  };

  return (
    <Container>
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
                <TableCell>
                  {new Date(borrow.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {borrow.deletedAt
                    ? new Date(borrow.deletedAt).toLocaleDateString()
                    : "No Entregado"}
                </TableCell>
                <TableCell>
                  <Button
                    disabled={borrow.deletedAt ? true : false}
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(borrow._id)}
                  >
                    Recibido
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
