import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { authService } from "../../services";
import { useNavigate } from "react-router-dom";
import { Alert } from "../Alert";

import { localStorage } from "../../services";

interface LoginProps {
  onLogin: (loggedIn: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showAlert, setShowAlert] = useState(false);
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
    const user = {
      name,
      password,
    };

    try {
      const response = await authService.login(user);
      if (response.token) {
        localStorage.set(response.token);
        onLogin(true);
        navigate("/");
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      setShowAlert(true);
    }
  };

  return (
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
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Ingresar
          </Button>
        </form>
        {showAlert && (
          <Alert
            message="User does not exist. Please register."
            onClose={() => setShowAlert(false)}
          />
        )}
      </Paper>
    </Container>
  );
};
