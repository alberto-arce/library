/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field: any) => (
          <FormControl fullWidth key={field.label}>
            <InputLabel>{field.label}</InputLabel>
            <Input
              value={editedData[field.value] || ""}
              onChange={(e) => handleFieldChange(field.value, e.target.value)}
            />
            <FormHelperText>Ingresar {field.label}</FormHelperText>
          </FormControl>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
