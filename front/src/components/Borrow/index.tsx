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
import { NotFoundImage } from "../NotFoundImage";

export const Borrow = () => {
  const [borrows, setBorrows] = useState<IBorrow[] | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await borrowService.getAll();
      if (response.success) {
        setBorrows(response.data);
      } else if (response.status !== 404) {
        setShowAlert(response.error || "Error inesperado");
      }
    } catch (error) {
      setShowAlert("Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (borrow: IBorrow) => {
    try {
      const response = await borrowService.delete(borrow._id, borrow.stock);
      if (response.success) {
        fetchData();
      } else {
        setShowAlert("No se pudo recibir");
      }
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
    }
  };

  return (
    <div>
      {!isLoading && !borrows?.length && <NotFoundImage/>}
      {!isLoading && borrows && borrows.length > 0 && (
        <Container>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Libro</TableCell>
                  <TableCell>Socio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Préstamo externo</TableCell>
                  <TableCell>Fecha de préstamo</TableCell>
                  <TableCell>Fecha de entrega</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {borrows?.map((borrow, index) => (
                  <TableRow key={index}>
                    <TableCell>{borrow?.book?.title}</TableCell>
                    <TableCell>{borrow?.member?.name}</TableCell>
                    <TableCell>{borrow.stock}</TableCell>
                    <TableCell>
                      {borrow.book.externalBorrow.toUpperCase()}
                    </TableCell>
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
                        variant="contained"
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
      )}
    </div>
  );
};
