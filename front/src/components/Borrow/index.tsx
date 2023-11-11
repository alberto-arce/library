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
import { Alert } from "../Alert";

export const Borrow = () => {
  const [borrows, setBorrows] = useState<IBorrow[] | undefined>([]);
  const [showAlert, setShowAlert] = useState<string | boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await borrowService.getAll();
      setBorrows(response?.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (borrow: IBorrow) => {
    try {
      const response = await borrowService.delete(borrow._id, borrow.stock);
      if (response.success) {
        const response = await borrowService.getAll();
        setBorrows(response.data);
      } else {
        setShowAlert("No se pudo recibir");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
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
              <TableCell>Cantidad</TableCell>
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
                <TableCell>{borrow.stock}</TableCell>
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
                    onClick={() => handleDelete(borrow)}
                  >
                    Recibido
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {showAlert && typeof showAlert === "string" && (
        <Alert message={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </Container>
  );
};
