import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ display: "flex", flexDirection: "row-reverse", color: "white" }}
        className="header"
      >
        <IconButton color="inherit">
          <Link to="/profile" className="no-text-decoration">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
