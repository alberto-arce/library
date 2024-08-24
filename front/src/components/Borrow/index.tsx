import { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container, Paper, Button, Grid, TextField } from "@mui/material";

import { borrowService } from "../../services";
import { Alert } from "../Alert";
import { IBorrow } from "./interfaces";
import { NotFoundImage } from "../NotFoundImage";
import "./index.css";

export const Borrow = () => {
  const [borrows, setBorrows] = useState<IBorrow[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await borrowService.getAll();
      if (response.success) {
        setBorrows(response.data);
      } else if (response.status !== 404) {
        Alert({
          type: "error",
          title: "Error al obtener los Libros",
          text: "Por favor, intenta de nuevo más tarde",
          timer: 2000,
        });
      }
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBorrows = useMemo(() => {
    return borrows?.filter((borrow) =>
      borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [borrows, searchTerm]);

  const handleDelete = async (borrow: IBorrow) => {
    try {
      const response = await borrowService.delete(borrow._id, borrow.stock);
      if (response.success) {
        fetchData();
      } else {
        Alert({
          type: "error",
          title: "Error al recibir libros",
          text: "Por favor, intenta de nuevo más tarde",
          timer: 2000,
        });
      }
    } catch (error) {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "bookTitle",
      headerName: "Libro",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
    },
    {
      field: "memberDni",
      headerName: "DNI Socio",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
    },
    {
      field: "memberName",
      headerName: "Socio",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
    },
    {
      field: "stock",
      headerName: "Cantidad",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
    },
    {
      field: "externalBorrow",
      headerName: "Préstamo externo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
    },
    {
      field: "createdAt",
      headerName: "Fecha de préstamo",
      flex: 1,
      valueFormatter: (params) => new Date(params).toLocaleDateString(),
      hideable: false,
    },
    {
      field: "deletedAt",
      headerName: "Fecha de entrega",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
      valueFormatter: (params) =>
        params ? new Date(params).toLocaleDateString() : "No Entregado",
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          disabled={!!params.row.deletedAt}
          variant="contained"
          color="success"
          onClick={() => handleDelete(params.row)}
        >
          Recibido
        </Button>
      ),
    },
  ];

  const getRowClassName = (params: { row: { deletedAt: Date | null } }) => {
    return params.row.deletedAt ? "row-disabled" : "";
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        padding: 0,
      }}
    >
      {!isLoading && !borrows?.length && <NotFoundImage />}
      {!isLoading && borrows && borrows.length > 0 && (
        <>
          <Grid container alignItems="center" style={{ marginBottom: 20 }}>
            <Grid item xs={12}>
              <TextField
                placeholder="Buscar por libro"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ margin: 0, backgroundColor: "#ffffff" }}
              />
            </Grid>
          </Grid>
          <Paper
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              <DataGrid
                rows={filteredBorrows?.map((borrow, index) => ({
                  id: index,
                  _id: borrow._id,
                  bookTitle: borrow?.book?.title,
                  memberDni: borrow?.member?.dni,
                  memberName: borrow?.member?.name,
                  stock: borrow.stock,
                  externalBorrow: borrow.book.externalBorrow.toUpperCase(),
                  createdAt: borrow.createdAt,
                  deletedAt: borrow.deletedAt,
                }))}
                columns={columns}
                pageSizeOptions={[10, 25, 50, 100]}
                disableColumnResize
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                getRowClassName={getRowClassName}
                localeText={{
                  noRowsLabel: "No hay préstamos",
                  columnMenuFilter: "Filtro",
                  columnMenuSortAsc: "Ordenar ascendente",
                  columnMenuSortDesc: "Ordenar descendente",
                }}
              />
            </div>
          </Paper>
        </>
      )}
    </Container>
  );
};
