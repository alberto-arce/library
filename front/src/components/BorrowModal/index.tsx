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
  const [showAlert, setShowAlert] = useState<string | boolean>(false);

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
        setShowAlert("Stock insuficiente");
        return;
      }
      if (!selectedMember) {
        return;
      }
      const response = await borrowService.create({
        memberId: selectedMember._id,
        bookId: selectedBook?._id,
        numberSelectedBooks,
        newStock: (selectedBook?.stock ?? 0) -  numberSelectedBooks ,
      });
      if (response.success) {
        setShowAlert("El préstamo fue realizado");
        onBookBorrowed();
      } else {
        setShowAlert("El préstamo no fue realizado");
      }
      closeBorrowModal();
    } catch (error) {
      setShowAlert("Hubo un error. Intentarlo más tarde");
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
      {showAlert && typeof showAlert === "string" && (
        <Alert message={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </>
  );
};
