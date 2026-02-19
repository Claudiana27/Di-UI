import React from "react";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { Facebook, LinkedIn, GitHub, Instagram, X } from "@mui/icons-material";

const footerLinks = [
  "Documentation",
  "Templates",
  "Support",
  "Confidentialite",
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 8, md: 12 },
        borderTop: "1px solid rgba(125, 211, 252, 0.2)",
        background:
          "linear-gradient(180deg, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.85) 40%, rgba(2, 6, 23, 0.95) 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr 1fr" },
            gap: 3,
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: "#f8fafc" }}>
              Builder IDE
            </Typography>
            <Typography sx={{ color: "#9fb4cc", maxWidth: 420, mt: 1, fontSize: 14 }}>
              Generez des composants frontend modernes, modifiez le code en temps reel et exportez
              rapidement vos blocs UI.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1}>
            {footerLinks.map((link) => (
              <Typography key={link} sx={{ color: "#cbd5e1", fontSize: 14 }}>
                {link}
              </Typography>
            ))}
          </Stack>

          <Box>
            <Typography sx={{ color: "#9fb4cc", mb: 1, fontSize: 13 }}>Suivez-nous</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[Facebook, LinkedIn, GitHub, Instagram, X].map((Icon, index) => (
                <IconButton
                  key={index}
                  size="small"
                  sx={{
                    color: "#dbeafe",
                    border: "1px solid rgba(125, 211, 252, 0.3)",
                    background: "rgba(15, 23, 42, 0.5)",
                    "&:hover": { background: "rgba(14, 165, 233, 0.18)" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        <Typography sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(125, 211, 252, 0.15)", color: "#8aa1ba", fontSize: 12 }}>
          © {new Date().getFullYear()} Builder IDE. Tous droits reserves.
        </Typography>
      </Container>
    </Box>
  );
}
