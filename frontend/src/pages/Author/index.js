import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, Grid} from '@mui/material';
import books from "../Details/books.jpeg"
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

const fetchAuthorBooks = (authorName, setResults, searchType) => {
  fetch(
      `/api/search?q=${authorName}${
          authorName ? `&${searchType}=${authorName}` : ""
      }`
  )
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    setResults(data.items);
  });
};

const AuthorPage = () => {
  const [result, setResult] = useState([])
  const searchType = "author";
  let location = useLocation();
  let author= decodeURI(location.pathname.substring(8));
  console.log(author)
  useEffect(() => {
    fetchAuthorBooks(author, setResult, searchType)
  },[location, setResult])

  return result ? (<div>
    <Card>
      <CardContent sx={{ display: 'flex', justifyContent: "left", ml:3, flexDirection: 'column'}}>
        <Typography component="div">
          <Typography gutterBottom variant="h4" component="div" color = "rgb(33, 112, 33)">
            {author}
          </Typography>
        </Typography >
        <Typography gutterBottom variant="h4" component="div" color = "rgb(33, 112, 33)">
          Books by this author:
        </Typography>
        <Grid container spacing={10} sx={{mt: 1}}>
          {result.map((currResult) => {
            const thumbnail = currResult.volumeInfo.imageLinks?.thumbnail;
            let numbers = /^[0-9]+$/;
            return currResult.volumeInfo.industryIdentifiers[0].identifier.match(numbers)
                && currResult.volumeInfo.authors ?
            <Box sx={{display: 'flex', pl: 10, pt:2, pb:1, pr: 6, flexDirection:'column'}}>
              <Link to={`/details/${currResult.volumeInfo.industryIdentifiers[0].identifier}`} className="unstyled-link">
                <CardMedia sx={{ display: 'flex', width: 275}}
                           component="img"
                           image={thumbnail?
                               thumbnail:
                               books}
                           alt="books in library"
                />
                <Typography gutterBottom variant="h6" component="div" color="text.secondary">
                  {currResult.volumeInfo.title}
                </Typography>
              </Link>
            </Box> : <></>;

          })}
        </Grid>
      </CardContent>
    </Card>
  </div>): <CircularProgress></CircularProgress>;
};

export default AuthorPage;
