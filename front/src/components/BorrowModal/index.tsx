import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import { memberService } from "../../services";
import { borrowService } from "../../services";
import { BorrowModalProps, IMember } from "./interfaces";
import { Alert } from "../Alert";
import "./index.css";

export const BorrowModal: React.FC<BorrowModalProps> = ({
  isOpen,
  onClose,
  selectedBook,
  onBookBorrowed,
}) => {
  const [members, setMembers] = useState<IMember[] | undefined>([]);
  const [numberSelectedBooks, setNumberSelectedBooks] = useState<number>(1);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await memberService.getAll();
      setMembers(response?.data);
    };
    fetchData();
  }, []);

  const handleChooseMember = (member: IMember) => {
    setSelectedMember(member);
  };

  const closeBorrowModal = () => {
    onClose();
  };

  const handleConfirmBorrow = async () => {
    try {
      if (selectedBook && numberSelectedBooks > selectedBook?.stock) {
        Alert({
          type: "error",
          title: "Error al Prestar Libro",
          text: "Stock insuficiente",
          timer: 2000
        });
        return;
      }
      if (!selectedMember) {
        return;
      }
      const response = await borrowService.create({
        memberId: selectedMember._id,
        bookId: selectedBook?._id,
        numberSelectedBooks,
        newStock: (selectedBook?.stock ?? 0) - numberSelectedBooks,
      });
      if (response.success) {
        Alert({
          type: "success",
          title: "Libro Prestado",
          text: "El libro ha sido prestado exitosamente.",
          timer: 2000
        });
        onBookBorrowed();
      } else {
        Alert({
          type: "warning",
          title: "Error al Prestar Libro",
          text: "No se pudo completar el préstamo del libro. Por favor, inténtalo de nuevo.",
          timer: 2000
        });
      }
      closeBorrowModal();
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
        timer: 2000
      });
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={closeBorrowModal}>
        <div className="modal-container">
          {selectedBook && (
            <div>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: "5px" }}
              >
                Libro seleccionado: {selectedBook.title}
              </Typography>
            </div>
          )}
          <Box className="table-container">
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="sticky-header">Socios</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members?.map((member, index) => (
                    <TableRow
                      key={index}
                      className={
                        selectedMember && selectedMember._id === member._id
                          ? "selected-row"
                          : ""
                      }
                      onClick={() => handleChooseMember(member)}
                    >
                      <TableCell>{member.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
          <TextField
            label="Cantidad de libros"
            variant="outlined"
            fullWidth
            type="number"
            value={numberSelectedBooks}
            onChange={(e) => setNumberSelectedBooks(Number(e.target.value))}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmBorrow}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
};
