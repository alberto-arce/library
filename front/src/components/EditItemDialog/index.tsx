/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Button,
  TextField,
} from "@mui/material";

import { IEditItemProps } from "./interfaces";

export const EditItemDialog = ({
  open,
  onClose,
  onSave,
  title,
  fields,
  initialData,
}: IEditItemProps) => {
  const [editedData, setEditedData] = useState(initialData || {});

  useEffect(() => {
    setEditedData(initialData || {});
  }, [initialData]);

  const handleFieldChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field: any) => (
          <FormControl fullWidth key={field.label} style={{ margin: 5 }}>
            <TextField
              type={
                field.value === "stock"
                  ? "number"
                  : field.value === "password"
                  ? "password"
                  : "text"
              }
              value={
                editedData[field.value] || (field.value === "stock" ? 1 : "")
              }
              onChange={(e) => handleFieldChange(field.value, e.target.value)}
              label={field.label}
              placeholder={`${field.label}`}
              variant="outlined"
              fullWidth
              inputProps={{
                min: field.value === "stock" ? 1 : undefined,
                step: field.value === "stock" ? 1 : undefined,
              }}
              helperText={
                field.value === "stock" &&
                (editedData[field.value] < 0
                  ? "Cantidad debe ser un número positivo"
                  : "")
              }
            /> 
          </FormControl>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
