import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Paper, Box, Button, Typography, TextField, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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

  useEffect(() => {
    setSelectedMember(null);
  }, [isOpen]);

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
          timer: 2000,
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
          timer: 2000,
        });
        onBookBorrowed();
      } else {
        Alert({
          type: "warning",
          title: "Error al Prestar Libro",
          text: "No se pudo completar el préstamo del libro. Por favor, inténtalo de nuevo.",
          timer: 2000,
        });
      }
      closeBorrowModal();
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde.",
        timer: 2000,
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "dni",
      headerName: "DNI socio",
      flex: 1,
      hideable: false,
    },
    {
      field: "name",
      headerName: "Nombre socio",
      flex: 1,
      hideable: false,
    },
    {
      field: "lastname",
      headerName: "Apellido socio",
      flex: 1,
      hideable: false,
    },
  ];

  return (
    <>
      <Modal open={isOpen} onClose={closeBorrowModal}>
        <div className="modal-container">
          {selectedBook && (
            <div>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: 30 }}
              >
                Libro seleccionado: {selectedBook.title}
              </Typography>
            </div>
          )}
          <Box style={{ marginBottom: 30 }}>
            <Paper>
              <DataGrid
                rows={members?.map((member, index) => ({
                  id: index,
                  _id: member._id,
                  dni: member.dni,
                  name: member.name,
                  lastname: member.lastname,
                }))}
                columns={columns}
                autoHeight
                pageSizeOptions={[10, 25]}
                onRowClick={(params) => handleChooseMember(params.row)}
                disableColumnResize
                disableColumnSelector
                localeText={{
                  noRowsLabel: "No hay socios",
                  columnMenuFilter: 'Filtro',
                  columnMenuSortAsc: 'Ordenar ascendente',
                  columnMenuSortDesc: 'Ordenar descendente',
                  footerRowSelected: (count: number) =>
                    `${count} fila seleccionada`,
                }}
              />
            </Paper>
          </Box>
          <TextField
            label="Cantidad de libros"
            variant="outlined"
            fullWidth
            type="number"
            value={numberSelectedBooks}
            onChange={(e) => setNumberSelectedBooks(Number(e.target.value))}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <Grid
            container
            spacing={2}
            justifyContent="flex-end"
            style={{ marginTop: 20 }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={closeBorrowModal}
                style={{ marginRight: 10 }}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleConfirmBorrow}
                disabled={!selectedMember}
              >
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};
