import { Box, Typography, Button } from "@mui/material"
import React, {useState, useEffect} from "react"


export default function Hero() {

    const [particles, setParticles] = useState([]);

  // Générer les particules une seule fois au montage
  useEffect(() => {
    const temp = [...Array(60)].map(() => ({
      size: Math.random() * 6 + 3,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
    setParticles(temp);
  }, []); // [] = ne s’exécute qu’une foiseule fois au montage
  return (
    <Box translate="no" data-no-translate
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: {md: 15, xs: 2},
        mx: {md: 15, xs: 2},
      }}
    >
     <Box 
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 2, md: 8 },
        height: { xs: 40, md: 120 },
      }}
    >
      {/* Titre fixe */}
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          fontSize: { md: 60, xs: 20 },
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        Build modern web UI in minutes
      </Typography>

      {/* Particules */}
      {particles.map((p, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            bottom: "10%",
            left: `${p.left}%`,
            width: {md: p.size , xs: p.size / 2},
            height: {md: p.size * 3, xs: p.size},
            background: "linear-gradient(60deg, #2563EB, #26f3c7)",
            borderRadius: "20%",
            opacity: 0.8,
            zIndex: 1,
            animation: `firework ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Glow central */}
      <Box
        sx={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          width: { xs: 180, md: 360 },
          height: { xs: 180, md: 360 },
          transform: "translate(-50%, 50%)",
          filter: "blur(120px)",
          opacity: 0.35,
          zIndex: 0,
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      {/* Keyframes */}
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes firework {
              0% { transform: translateY(0) scaleY(1); opacity: 0.8; }
              50% { opacity: 0.9; }
              100% { transform: translateY(-250px) scaleY(0.5); opacity: 0; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 0.6; }
            }
          `,
        }}
      />
    </Box>
      <Typography sx={{ mt: 2, maxWidth: {md: 900, xs: 900 }, fontSize: {md: 18, xs: 10}}}>
        Choose beautiful UI blocks, preview them, and copy the code.
      </Typography>

     <Box
  sx={{
    mt: 4,
    display: "flex",
    gap: 2,          // espace entre les boutons
    flexWrap: "wrap", // autorise de passer à la ligne si écran trop petit
    justifyContent: { xs: "center", md: "flex-start" }, // centrer sur mobile
  }}
>
  <Button
    variant="contained"
    size="large"
    sx={{
      px: { xs: 2, md: 3 },
      py: { xs: 1, md: 1.5 },
      fontSize: { xs: "0.85rem", md: "1rem" },
      background: "linear-gradient(35deg, #2563EB, #26f3c7)",
    }}
  >
    Watch the product demo
  </Button>

  <Button
    variant="outlined"
    size="large"
    sx={{
      px: { xs: 2, md: 3 },
      py: { xs: 1, md: 1.5 },
      fontSize: { xs: "0.85rem", md: "1rem" },
    }}
  >
    GitHub
  </Button>
</Box>

    </Box>
  )
}
