import React from "react"
import {Box, Typography} from "@mui/material"

export default function Titre(){
    return(
        <Box fontWeight="bold" sx={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           mt: { md: 2, xs: 1 },
        }}>
            {/*<Typography fontWeight="bold" variant="h3" >Which Framework</Typography>*/}
            <Typography fontWeight="bold" variant="h1" sx={{
                fontSize: { xs: 72, sm: 110, md: 180 },
                lineHeight: 1,
                letterSpacing: "-0.02em",
                backgroundImage:
                  "linear-gradient(120deg, #f0f9ff 0%, #7dd3fc 28%, #22d3ee 54%, #38bdf8 72%, #f0f9ff 100%)",
                backgroundSize: "220% 220%",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 36px rgba(56, 189, 248, 0.35)",
                zIndex: 10,
                animation: "sparkleShift 6s ease-in-out infinite"
            }}>?</Typography>
            <Box
              component="style"
              dangerouslySetInnerHTML={{
                __html: `
                  @keyframes sparkleShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `,
              }}
            />
        </Box>
    )
}


