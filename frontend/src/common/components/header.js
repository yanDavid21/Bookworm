import React from "react";
import AppBar from "@mui/material/AppBar";
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
        <Link to="/profile" className="no-text-decoration">
          <IconButton color="inherit">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
