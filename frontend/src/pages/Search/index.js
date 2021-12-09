import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import BooksImage from "../../common/resources/stackOfBooks.png";
import { SearchField, SearchTypeRadioGroup } from "./searchInput";

const SearchResultCard = ({ title, isbn, authors, thumbnail, description }) => {
  return (
    <>
      <Link to={`/details/${isbn}`} className="unstyled-link">
        <Card>
          <ListItem alignItems="flex-center" sx={{ maxWidth: 600 }}>
            <ListItemAvatar sx={{ mr: 2 }}>
              {thumbnail ? (
                <img alt={`Thumbail of ${title}`} src={thumbnail} />
              ) : (
                <img
                  alt={`Thumbail of ${title}`}
                  src={BooksImage}
                  width={100}
                  height={100}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{ display: "block" }}
                  component="div"
                  variant="h6"
                  color="text.primary"
                >
                  {title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: "block" }}
                    component="div"
                    variant="subtitle1"
                    color="text.primary"
                  >
                    {authors ? authors.join(", ") : ""}
                  </Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {description
                      ? description.length < 250
                        ? description
                        : description.substring(0, 250) + "..."
                      : ""}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Card>
        <Divider component="li" sx={{ mt: 2, mb: 2 }} />
      </Link>
    </>
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
                    const isbn =
                      result.volumeInfo.industryIdentifiers[0].identifier;
                    const title = result.volumeInfo.title;
                    const authors = result.volumeInfo.authors;
                    const description = result.volumeInfo.description;
                    const thumbnail = result.volumeInfo.imageLinks?.thumbnail;
                    if (isbn.substring(0,4) !== "OCLC") {
                    return (
                      <SearchResultCard
                        title={title}
                        isbn={isbn}
                        authors={authors}
                        thumbnail={thumbnail}
                        description={description}
                      />
                    );}
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
