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
import { Button, CardActionArea, CardActions } from '@mui/material';
import books from "../Details/books.jpeg"
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const fetchAuthor = (authorName, setResults, searchType) => {
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
    setResults(data);
  });
};

const AuthorPage = () => {
  const [result, setResult] = useState(null)
  const searchType = "author";
  let location = useLocation();
  console.log(location.pathname)
  useEffect(() => {
    fetchAuthor(location.pathname.substring(8), setResult, searchType)
  },[location, setResult])

  return result ? (<div>
    <Card>
      <CardActionArea sx={{ display: 'flex' }}>
        <Box>
          <CardMedia sx={{ display: 'flex', ml:1, flexDirection: 'column', minWidth: 350}}
                     component="img"
                     image={result.items[0].volumeInfo.imageLinks.thumbnail?
                         result.items[0].volumeInfo.imageLinks.thumbnail:
                         books}
                     alt="books in library"
          />
          <Button
              sx={{ mt: 4, ml:2, mb:2, width: 330, backgroundColor: "rgb(33, 112, 33)" }}
              variant="contained"
              // onClick={}
          >
            Add to Reading List
          </Button>
          <Button
              sx={{ ml:2, mb:2, width: 330, backgroundColor: "rgb(33, 112, 33)" }}
              variant="contained"
              // onClick={}
          >
            Add to Bookshelf
          </Button>
          <Button
              sx={{ ml:2, mb:2, width: 330, backgroundColor: "rgb(33, 112, 33)" }}
              variant="contained"
              // onClick={}
          >
            Add to Favorites
          </Button>
        </Box>
        <CardContent sx={{ display: 'flex', position:"relative", mt:-10, ml:3, flexDirection: 'column', flex: '3 1 auto'}}>
          <Typography gutterBottom variant="h4" component="div">
            {result.items[0].volumeInfo.title}
            <Link to={`/author`}>
              <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                {result.items[0].volumeInfo.authors.length === 1? result.items[0].volumeInfo.authors:
                    result.items[0].volumeInfo.authors.join(", ")}
                {/*{console.log(result.items[0].volumeInfo.authors)}*/}
                {/*{result.items[0].volumeInfo.authors}*/}
              </Typography>
            </Link>
          </Typography>
          <Typography>
            {result.items[0].volumeInfo.description}
          </Typography>
          <Typography sx={{mt: 3}}>
            Published in {result.items[0].volumeInfo.publishedDate} by {result.items[0].volumeInfo.publisher}
          </Typography>
          <Typography sx={{mt: 3}}>
            {result.items[0].volumeInfo.publishedDate} by {result.items[0].volumeInfo.publisher}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </div>): <CircularProgress></CircularProgress>;
};

export default AuthorPage;
