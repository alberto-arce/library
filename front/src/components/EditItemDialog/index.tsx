/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field: any) => (
          <FormControl
            fullWidth
            key={field.label}
            style={{ marginBottom: "30px" }}
          >
            <Input
              value={editedData[field.value] || ""}
              onChange={(e) => handleFieldChange(field.value, e.target.value)}
            />
            <FormHelperText>{field.label}</FormHelperText>
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
