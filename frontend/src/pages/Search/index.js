import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, useLocation } from "react-router-dom";
import { Card } from "@mui/material";
import BooksImage from "../../common/resources/stackOfBooks.png";
import { SearchField, SearchTypeRadioGroup } from "./searchInput";

const SearchResultCard = ({
  title,
  isbn,
  authors,
  thumbnail,
  description,
  inReadingList,
  inProgressList,
  inFinishedList,
  userType
}) => {
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
                  {userType === 'paid'? (inReadingList.includes(isbn) && (
                    <Typography
                      sx={{ display: "block", textAlign: "center" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      This book is in your Reading list!
                    </Typography>
                  )) : ''}
                  {userType === 'paid'? (inProgressList.includes(isbn) && (
                    <Typography
                      sx={{ display: "block", textAlign: "center" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      This book is in your In Progress List!
                    </Typography>
                  )) : ''}
                  {inFinishedList.includes(isbn) && (
                    <Typography
                      sx={{ display: "block", textAlign: "center" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      This book is in your Finished List! Well done :)
                    </Typography>
                  )}
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

const SearchPage = ({ token }) => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [bonusQuery, setBonusQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showBonus, setBonusSearch] = useState(false);
  const location = useLocation();
  const [inReadingList, setReadingList] = useState([]);
  const [inProgressList, setProgressList] = useState([]);
  const [inFinishedList, setFinishedList] = useState([]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if (location.search === "") {
      return;
    }
    const queryString = location.search.substring(1).replaceAll("%20", " ");
    const queryKeyValuePairs = queryString.split("&");
    let q = "";
    let searchType;
    let bonusQ;
    queryKeyValuePairs.forEach((pair) => {
      const elements = pair.split("=");
      const key = elements[0];
      const value = elements[1];
      switch (key) {
        case "q":
          q = value;
          setSearch(value);
          break;
        case "searchType":
          searchType = value;
          setBonusSearch(true);
          setSearchType(value);
          break;
        case "bonusQ":
          bonusQ = value;
          setBonusSearch(true);
          setBonusQuery(value);
          break;
        default:
          break;
      }
    });

    fetch(
      `/api/search?q=${q}${
        bonusQ && searchType ? `&${searchType.toLowerCase()}=${bonusQ}` : ""
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSearchResults(data.items ?? []);
        data.items ?? alert("No results, please try another query.");
      })
      .catch((err) => {
        alert("Search: " + err);
      });
  }, [location.search]);

  useEffect(() => {
    if (token) {
      fetch(`/api/get-current-user-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), //{message: '', token: ''}
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserType(data.userType);
          setReadingList(data.to_read);
          if(userType === 'paid') {
            setProgressList(data.in_progress);
            setFinishedList(data.finished);
          }
        })
        .catch((err) => {
          alert("Token: " + err);
        });
    }
  }, [token]);

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
                    searchType={searchType}
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
                  {/*{searchResults.filter((result) => {*/}
                  {/*  return result.volumeInfo*/}
                  {/*      && result.volumeInfo.title*/}
                  {/*      && result.volumeInfo.authors*/}
                  {/*      && result.volumeInfo.description*/}
                  {/*      && result.volumeInfo.imageLinks*/}
                  {/*      && result.volumeInfo.imageLinks.thumbnail*/}
                  {/*      && result.volumeInfo.industryIdentifier;*/}
                  {searchResults.map((result) => {
                    console.log("ugh")
                    if (typeof(result.volumeInfo.industryIdentifier) !== undefined
                        && typeof(result.volumeInfo.industryIdentifiers[0]) !== undefined
                        && typeof(result.volumeInfo.industryIdentifiers[0].type) !== undefined) {
                    console.log(result.volumeInfo);
                    const isbnType = result.volumeInfo.industryIdentifiers[0].type;
                    const title = result.volumeInfo.title;
                    const authors = result.volumeInfo.authors;
                    const description = result.volumeInfo.description;
                    const thumbnail = result.volumeInfo.imageLinks?.thumbnail;
                    if (isbnType === 'ISBN_13') {
                      const isbn = result.volumeInfo.industryIdentifiers[0].identifier;
                      return (
                        <SearchResultCard
                          title={title}
                          isbn={isbn}
                          authors={authors}
                          thumbnail={thumbnail}
                          description={description}
                          inReadingList={inReadingList}
                          inProgressList={inProgressList}
                          inFinishedList={inFinishedList}
                          userType={userType}
                        />
                      );
                    } else {
                      console.log(".....")
                      return <></>;
                    }
                  } else {
                      return <></>;
                    }})}
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
