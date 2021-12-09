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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const SearchResultCard = ({ title, isbn, authors, thumbnail, description }) => {
  return (
    <>
      <Link to={`/details/${isbn}`} className="unstyled-link">
        <ListItem alignItems="flex-center" sx={{ width: 500 }}>
          <ListItemAvatar>
            <Avatar alt={`Thumbail of ${title}`} src={thumbnail} />
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {description}
              </Typography>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Link>
    </>
  );
};

function SearchTypeRadioGroup({ setSearchType, bonusQuery, setBonusQuery }) {
  const onChange = (e) => {
    setSearchType(e.target.value);
  };

  const onChangeBonusQuery = (e) => {
    setBonusQuery(e.target.value);
  };
  return (
    <FormControl component="fieldset">
      <div className="flex-horizontal flex-center">
        <RadioGroup
          row
          aria-label="Search Types"
          name="row-radio-buttons-group"
          onChange={onChange}
        >
          <FormControlLabel value="ISBN" control={<Radio />} label="ISBN" />
          <FormControlLabel value="Title" control={<Radio />} label="Title" />
          <FormControlLabel value="Author" control={<Radio />} label="Author" />
          <FormControlLabel
            value="Subject"
            control={<Radio />}
            label="Subject"
          />
          <FormControlLabel
            value="Publisher"
            control={<Radio />}
            label="Publisher"
          />
        </RadioGroup>
        <TextField
          size="small"
          value={bonusQuery}
          onChange={onChangeBonusQuery}
        ></TextField>
      </div>
    </FormControl>
  );
}

const SearchField = ({
  search,
  setSearch,
  searchType,
  setSearchResults,
  bonusQuery,
}) => {
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchBooks = () => {
    console.log(
      `/api/search?q=${search}${
        bonusQuery ? `&${searchType.toLowerCase()}=${bonusQuery}` : ""
      }`
    );
    fetch(
      `/api/search?q=${search}${
        bonusQuery ? `&${searchType.toLowerCase()}=${bonusQuery}` : ""
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.items);
        setSearchResults(data.items);
      })
      .catch((err) => {
        alert(err);
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
  const [bonusQuery, setBonusQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showBonus, setBonusSearch] = useState(false);
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
                  bonusQuery={bonusQuery}
                />
              </div>
            </Grid>

            {showBonus && (
              <Grid item xs={12}>
                <div className="flex-horizontal flex-center">
                  <SearchTypeRadioGroup
                    setSearchType={setSearchType}
                    bonusQuery={bonusQuery}
                    setBonusQuery={setBonusQuery}
                  />
                </div>
              </Grid>
            )}
            <Grid item xs={12}>
              <div className="flex-horizontal flex-center">
                <Button
                  onClick={() => {
                    setBonusSearch(!showBonus);
                  }}
                >
                  {showBonus ? "Hide Advanced Search" : "Show Advanced Search"}
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="search-results flex-horizontal flex-center">
                <List>
                  {searchResults.map((result) => {
                    const isbn = result.volumeInfo.industryIdentifiers[0].identifier;
                    const title = result.volumeInfo.title;
                    const authors = result.volumeInfo.authors;
                    const description = result.volumeInfo.description;
                    const thumbnail = result.volumeInfo.imageLinks.thumbnail;
                    return (
                      <SearchResultCard
                        title={title}
                        isbn={isbn}
                        authors={authors}
                        thumbnail={thumbnail}
                        description={description}
                      />
                    );
                  })}
                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchPage;
