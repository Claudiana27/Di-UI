import React from "react"
import {Box, Typography, AppBar} from "@mui/material"
import { Facebook,LinkedIn, GitHub, Instagram, Twitter, WhatsApp, Telegram } from "@mui/icons-material";


export default function footer(){
    return(
      <AppBar position="static" sx={{
        background: "black",
        width: "100%",
        height: 250,
        mt: 20,
        mb: 5
      }}>
       <Box>
        <Typography sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 50,
            mt: 15
        }}>
            <Facebook/>
            <LinkedIn/>
            <GitHub/>
            <Instagram/>
            <Twitter/>
            <WhatsApp/>
            <Telegram/>
        </Typography>
       </Box>
      </AppBar>
    );
}