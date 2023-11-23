import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Input,
  Button,
  Select,
  MenuItem,
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <FormControl
            fullWidth
            key={field.label}
            style={{ marginBottom: "30px" }}
          >
            {field.value === "externalBorrow" ? (
              <Select
                value={item[field.value] || ""}
                onChange={(e) =>
                  handleFieldChange(field.value, e.target.value as string)
                }
              >
                <MenuItem value="si">Si</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            ) : (
              <Input
                value={item[field.value] || ""}
                onChange={(e) => handleFieldChange(field.value, e.target.value)}
                placeholder={`${field.label}`}
              />
            )}
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
