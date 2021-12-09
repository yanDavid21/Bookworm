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
import books from "./books.jpeg"
import {BACKEND_URL} from "../../App";

const fetchBook = (isbn, setResults) => {
  fetch(`/api/details?q=${isbn}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    setResults(data);
  });
};

const DetailsPage = () => {
  let location = useLocation();
  let [result, setResult] = useState(null)
  console.log(location.pathname)
  useEffect(() => {
    fetchBook(location.pathname.substring(8), setResult)
  },[location, setResult])
  return <div>
    <Card>
      <CardActionArea>
        <CardMedia
            component="img"
            height="300"
            image={books}
            alt="books in library"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {location.pathname.substring(1).toUpperCase()}
            result.title
          </Typography>
          <Typography  color="text.secondary">
            by result.author [get author here]
          </Typography>
          <Typography>
            result.description   get description here
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>





  </div>;
};

export default DetailsPage;
