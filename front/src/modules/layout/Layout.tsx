import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const pages = ["usuarios", "socios", "libros", "prestamos"];
const settings = ["salir"];

export const LayoutModule: React.FC<{
  userName: string;
  userRole: string | undefined;
}> = ({ userName, userRole }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    navigate("/ingresar");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                slotProps={{
                  paper: {
                    sx: {
                      backgroundColor: "#414242",
                    },
                  },
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {userRole === "admin" && (
                  <div>
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: location.pathname === `/${page}` ? "FFA500" : "white", 
                          display: "block",
                        }}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/${page}`}
                        >
                          {page}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
                {userRole === "employee" && (
                  <div>
                    {pages
                      .filter(
                        (page) => page !== "usuarios" && page !== "socios"
                      )
                      .map((page) => (
                        <Button
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: location.pathname === `/${page}` ? "FFA500" : "white",
                            display: "block",
                          }}
                        >
                          <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/${page}`}
                          >
                            {page}
                          </Link>
                        </Button>
                      ))}
                  </div>
                )}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {userRole === "admin" && (
                <>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: location.pathname === `/${page}` ? "#FFA500" : "white",
                        display: "block",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Button>
                  ))}
                </>
              )}
              {userRole === "employee" && (
                <>
                  {pages
                    .filter((page) => page !== "usuarios" && page !== "socios")
                    .map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: location.pathname === `/${page}` ? "FFA500" : "white",
                          display: "block",
                        }}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/${page}`}
                        >
                          {page}
                        </Link>
                      </Button>
                    ))}
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Configuraciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#f50057' }}>{userName.charAt(0).toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {setting === "salir" ? (
                        <>
                          <span style={{cursor: 'default'}}>Hola {userName}</span> <br/>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogout();
                            }}
                          >
                            {setting}
                          </a>
                        </>
                      ) : (
                        setting
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
