import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { BACKEND_URL } from "../../App";

function SearchTypeRadioGroup({ setSearchType }) {
  const onChange = (e) => {
    setSearchType(e.target.value);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="Search Types"
        name="row-radio-buttons-group"
        onChange={onChange}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel value="Title" control={<Radio />} label="Title" />
        <FormControlLabel value="Author" control={<Radio />} label="Author" />
        <FormControlLabel value="Subject" control={<Radio />} label="Subject" />
        <FormControlLabel
          value="Publisher"
          control={<Radio />}
          label="Publisher"
        />
      </RadioGroup>
    </FormControl>
  );
}

const SearchField = ({ search, setSearch, searchType, setSearchResults }) => {
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchBooks = () => {
    fetch(`${BACKEND_URL}/api/search?q=${search}&searchType=${searchType}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSearchResults(data.volumes);
      });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
      <SearchIcon
        sx={{ color: "action.active", mr: 1, my: 0.5 }}
        fontSize="large"
      />
      <TextField
        fullWidth
        label="Search for your faves :)"
        id="fullWidth"
        value={search}
        onChange={onChange}
      />
      <Button
        sx={{ ml: 1, backgroundColor: "rgb(33, 112, 33)" }}
        variant="contained"
        onClick={fetchBooks}
      >
        Search
      </Button>
    </Box>
  );
};

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchType);
  return (
    <div className="search-page flex-horizontal flex-center">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} justifyContent="center">
              <div className="flex-horizontal flex-center">
                <SearchField
                  search={search}
                  setSearch={setSearch}
                  searchType={searchType}
                  setSearchResults={setSearchResults}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex-horizontal flex-center">
                <SearchTypeRadioGroup setSearchType={setSearchType} />
              </div>
            </Grid>
            <Grid container item xs={12}>
              <div className="search-results">
                {searchResults.map(() => {
                  return <></>;
                })}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchPage;
