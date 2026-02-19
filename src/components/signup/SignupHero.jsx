import React from "react";
import Bg from "../assets/logo-diana.png"
import {Box} from "@mui/material"

export default function SignupHero(){
    return(
                <Box sx={{
          position:"relative",
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          display: "block",
          width: { xs: 84, sm: 170, md: 360 },
          height: { xs: 84, sm: 170, md: 360 },
          flexShrink: 0,
        }}>   
        </Box>
        
    );
}
