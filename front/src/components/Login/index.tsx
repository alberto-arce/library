import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { authService } from "../../services";
import { useNavigate } from "react-router-dom";
import { Alert } from "../Alert";

import { localStorage } from "../../services";
import "./index.css";

interface LoginProps {
  onLogin: (
    loggedIn: boolean,
    user: { name: string; role: string } | undefined
  ) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await authService.login({
        name,
        password,
      });
      if (response.success) {
        localStorage.set(response);
        onLogin(true, response.user);
        navigate("/");
      } else {
        Alert({
          type: "error",
          title: "Oops...",
          text: "Nombre y/o contraseña incorrectas",
          position: "center",
          timer: 2000,
        });
      }
    } catch {
      Alert({
        type: "error",
        title: "Oops...",
        text: "Hubo un problema. Por favor, intenta de nuevo más tarde",
        timer: 2000,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-form-container">
        <Container maxWidth="xs">
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Ingresar
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={handleUsernameChange}
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Ingresar
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};
