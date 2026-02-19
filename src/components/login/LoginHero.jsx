import React from "react"
import {Box} from "@mui/material"
import Bg from "../assets/logo-diana.png"

export default function LoginHero(){
    return(
        <Box sx={{
            position: "relative",
            backgroundImage: `url(${Bg})`,
            backgroundSize: "cover",
            borderRadius: "50%",
            backgroundPosition: "center",
            display: "block",
            width: { xs: 84, sm: 170, md: 360 },
            height: { xs: 84, sm: 170, md: 360 },
            flexShrink: 0,
        }}
        />
    )
}
