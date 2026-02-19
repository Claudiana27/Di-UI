import React from "react";
import { Container, Box, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import SignupHero from "./SignupHero";


export default function Signup() {
  const navigate = useNavigate();

  return (
      <Container position= "static" sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 0.5, md: 3 },
        px: { xs: 2, sm: 4, md: 2 },
        width: "100%",
        maxWidth: 1120,
        mx: "auto",
        height: "100dvh",
        overflow: "hidden",
      }}>
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: { xs: 10, md: 16 },
          left: { xs: 12, md: 20 },
          zIndex: 20,
          color: "#dbeafe",
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid rgba(125, 211, 252, 0.35)",
          background: "rgba(15, 23, 42, 0.45)",
          "&:hover": {
            background: "rgba(15, 23, 42, 0.7)",
          },
        }}
      >
        <ArrowBackRoundedIcon fontSize="small" />
      </IconButton>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 980,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 8 },
          p: { xs: 1.5, sm: 2.5, md: 5 },
          maxHeight: "100%",
          borderRadius: 6,
          background:
            "linear-gradient(155deg, rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.55))",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          boxShadow:
            "0 20px 60px rgba(2, 6, 23, 0.55), inset 0 0 0 1px rgba(148, 163, 184, 0.08)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: { xs: 180, md: 260 },
            height: { xs: 180, md: 260 },
            borderRadius: "50%",
            bottom: { xs: -50, md: -80 },
            right: { xs: -40, md: -70 },
            background: "radial-gradient(circle, rgba(45,212,191,0.3), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <SignupHero/>
        <SignupForm/>
      </Box>
      </Container>
  );
}
