import React from "react"
import {Container, Box} from "@mui/material"
import LoginHero from "./LoginHero"
import LoginForm from "./LoginForm"

export default function Login(){
    return(
      <Container
      position= "static" sx={{
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
            top: { xs: -50, md: -80 },
            left: { xs: -40, md: -70 },
            background: "radial-gradient(circle, rgba(56,189,248,0.35), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <LoginHero/>
        <LoginForm/>
      </Box>
      </Container>
    );

}
