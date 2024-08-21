/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

interface FormField {
  label: string;
  value: string;
}

interface Item {
  [key: string]: string;
}

interface IAddItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: any) => Promise<void>;
  title: string;
  fields: FormField[];
}

export const AddItemDialog = ({
  open,
  onClose,
  onSave,
  title,
  fields,
}: IAddItemProps) => {
  const [item, setItem] = useState<Item>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const checkFormValidity = useCallback(() => {
    const allFieldsFilled = fields.every((field) => {
      if (field.value === "dni") {
        return item[field.value]?.trim().length === 8;
      }
      if (field.value === "externalBorrow") {
        return item[field.value] !== "";
      }
      return item[field.value]?.trim() !== "";
    });
    setIsFormValid(allFieldsFilled);
  }, [fields, item]);

  useEffect(() => {
    if (open) {
      setItem(
        fields.reduce((acc, field) => {
          acc[field.value] = "";
          return acc;
        }, {} as Item)
      );
      setIsFormValid(false);
    }
  }, [open, fields]);

  useEffect(() => {
    checkFormValidity();
  }, [item, checkFormValidity]);

  const handleFieldChange = (field: string, value: string) => {
    setItem((prevItem) => ({ ...prevItem, [field]: value }));
  };

  const handleSave = () => {
    onSave(item);
    setItem(
      fields.reduce((acc, field) => {
        acc[field.value] = "";
        return acc;
      }, {} as Item)
    );
  };

  const handleClose = () => {
    onClose();
    setItem(
      fields.reduce((acc, field) => {
        acc[field.value] = "";
        return acc;
      }, {} as Item)
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <FormControl fullWidth key={field.label} style={{ margin: 10 }}>
            {field.value === "externalBorrow" ? (
              <Select
                value={item[field.value] || ""}
                onChange={(e) =>
                  handleFieldChange(field.value, e.target.value as string)
                }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  ¿Es un préstamo externo?
                </MenuItem>
                <MenuItem value="si">Si</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            ) : (
              <TextField
                type={field.value === "password" ? "password" : "text"}
                value={item[field.value] || ""}
                onChange={(e) => handleFieldChange(field.value, e.target.value)}
                label={field.label}
                placeholder={`${field.label}`}
                variant="outlined"
                fullWidth
                inputProps={field.value === "dni" ? { maxLength: 8 } : {}}
                helperText={
                  field.value === "dni" &&
                  (item[field.value]?.trim().length !== 8
                    ? "Ingresar los 8 dígitos del DNI"
                    : "")
                }
              />
            )}
          </FormControl>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          disabled={!isFormValid}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
