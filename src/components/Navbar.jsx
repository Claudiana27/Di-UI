import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box translate="no" className="notranslate">
          <Avatar
            src="/logo-diana.png"
            sx={{
              width: { xs: 30, md: 80 },
              height: { xs: 30, md: 80 },
            }}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/login") }
            sx={{
              fontSize: { xs: 12, md: 14 },
              borderRadius: 999,
              border: "1px solid rgba(125, 211, 252, 0.35)",
              color: "#dbeafe",
            }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              fontSize: { xs: 12, md: 14 },
              borderRadius: 999,
              background: "linear-gradient(100deg, #0ea5e9, #14b8a6)",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
