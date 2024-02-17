import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MdAppRegistration } from "react-icons/md";


function Navbar({title}) {
  return (
    <>
      <Box sx={{ display: "flex",height:"50px" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#2F70CB",
            padding: "15px",
            boxShadow: "none",
            height:"2.5rem"
          }}
        >
          <Toolbar style={{ padding: "0px", minHeight: "0px" }}>
              <MdAppRegistration size={25} style={{color:"#fff"}}/>
            <Box sx={{ paddingLeft: ".5em" }}>
              <Typography style={{fontSize:20,fontFamily:"Poppins"}}>
                {title}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
