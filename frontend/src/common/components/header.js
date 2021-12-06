import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{ display: "flex", flexDirection: "row-reverse", color: "white" }}
          className="header"
        >
          <IconButton color="inherit">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
