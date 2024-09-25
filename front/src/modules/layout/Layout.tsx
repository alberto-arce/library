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
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const pages = ["usuarios", "socios", "libros", "prestamos"];

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

  const isActive = (page: string) => location.pathname === `/${page}`;

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
                          mx: 1,
                          color: isActive(page) ? "#FFA500" : "white",
                          textDecoration: isActive(page) ? "underline" : "none",
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: isActive(page) ? "transparent" : "#555",
                            color: isActive(page) ? "#FFA500" : "white",
                          },
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
                      .filter((page) => page !== "usuarios" && page !== "socios")
                      .map((page) => (
                        <Button
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            mx: 1,
                            color: isActive(page) ? "#FFA500" : "white",
                            textDecoration: isActive(page) ? "underline" : "none",
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: isActive(page) ? "transparent" : "#555",
                              color: isActive(page) ? "#FFA500" : "white",
                            },
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
                        mx: 1,
                        color: isActive(page) ? "#FFA500" : "white",
                        textDecoration: isActive(page) ? "underline" : "none",
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: isActive(page) ? "transparent" : "#555",
                          color: isActive(page) ? "#FFA500" : "white",
                        },
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
                          mx: 1,
                          color: isActive(page) ? "#FFA500" : "white",
                          textDecoration: isActive(page) ? "underline" : "none",
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: isActive(page) ? "transparent" : "#555",
                            color: isActive(page) ? "#FFA500" : "white",
                          },
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
                  <Avatar sx={{ bgcolor: "#f50057" }}>
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
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
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    padding: 1,
                    width: 'auto', 
                    minWidth: 100, 
                  }}
                >
                  <Typography textAlign="center" sx={{ mb: 1, pointerEvents: 'none' }}>
                    Hola {userName}
                  </Typography>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    sx={{
                      color: "inherit",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                        color: "white",
                      },
                      padding: 0,
                      marginTop: 1,
                    }}
                  >
                    Salir
                  </Button>
                </Box>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
