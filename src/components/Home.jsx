import { Box, Container, Paper, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Titre from "../components/Titre";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Titre />
      <Carousel />
      <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {[
            {
              title: "Generation rapide",
              text: "Choisissez une categorie et obtenez plusieurs styles prets a personnaliser.",
            },
            {
              title: "Edition en direct",
              text: "Le rendu et le code restent synchronises pour iterer vite sur chaque bloc.",
            },
            {
              title: "Export propre",
              text: "Copiez le snippet ou exportez en .zip pour reutiliser dans vos projets.",
            },
          ].map((item) => (
            <Paper
              key={item.title}
              sx={{
                p: 2.2,
                borderRadius: 3,
                background: "rgba(15, 23, 42, 0.62)",
                border: "1px solid rgba(125, 211, 252, 0.2)",
              }}
            >
              <Typography fontWeight={700} sx={{ mb: 0.6 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: "#9fb4cc", fontSize: 14 }}>{item.text}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
      <Footer />
    </>
  );
}
