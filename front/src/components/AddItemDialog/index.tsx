import { useState } from "react";
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

import { IAddItemProps } from "./interfaces";

export const AddItemDialog = ({
  open,
  onClose,
  onSave,
  title,
  fields,
}: IAddItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [item, setItem] = useState<any>({});
  const handleFieldChange = (field: string, value: string) => {
    setItem({ ...item, [field]: value });
  };

  const handleSave = () => {
    onSave(item);
    setItem({});
  };

  const handleClose = () => {
    onClose();
    setItem({});
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <FormControl fullWidth key={field.label}>
            <InputLabel>{field.label}</InputLabel>
            <Input
              value={item[field.value] || ""}
              onChange={(e) => handleFieldChange(field.value, e.target.value)}
            />
            <FormHelperText>Ingresar {field.label}</FormHelperText>
          </FormControl>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
