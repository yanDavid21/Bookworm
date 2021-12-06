import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

function FullWidthTextField() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
      <SearchIcon
        sx={{ color: "action.active", mr: 1, my: 0.5 }}
        fontSize="large"
      />
      <TextField fullWidth label="Search for your faves :)" id="fullWidth" />
    </Box>
  );
}

const SearchPage = () => {
  return (
    <div className="search-page flex-horizontal flex-center">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="flex-horizontal flex-center">
            <FullWidthTextField />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchPage;
