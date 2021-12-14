import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import books from "./books.jpeg";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export const fetchBook = (isbn, setResults, searchType) => {
  console.log("isbn: " + isbn);
  fetch(
    `/api/search?q=${isbn}${isbn ? `&${searchType.toLowerCase()}=${isbn}` : ""}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setResults(data);
    });
};

const addBookToList = (bodyParams, location) => {
  const isbn = location.pathname.substring(9);
  console.log("Adding book isbn# " + isbn + " to list " + bodyParams.listType);
  bodyParams.isbn = isbn;
  fetch("/api/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParams),
  }).then((response) => {
    if (response.status === 200) {
      console.log("Book successfully added.");
    } else {
      console.log("Failed to add book.");
    }
  });
};

// async function getUserType(
//   token,
//   setUserType
// ) {
//   return (
//     fetch("http://localhost:5000/api/get-current-user-data", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(token),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('this is the data: ' + JSON.stringify(data))
//         console.log('this is the user type: ' + data.userType);
//         setUserType(data.userType);
//       })
//       // .then(response => response.json())
//       .catch((err) => {
//         alert(err);
//       })
//   );
// }

const DetailsPage = ({ token, userType }) => {
  let location = useLocation();
  const [result, setResult] = useState(null);
  const searchType = "ISBN";
  console.log(location.pathname);
  useEffect(() => {
    fetchBook(location.pathname.substring(9), setResult, searchType);
  }, [location, setResult]);
  // useEffect(async () => {
  //   await getUserType(
  //     { token },
  //     setUserType
  //   );
  // }, []);

  return result ? (
    <div>
      <Card sx={{justifyContent: "flex-start"}}>
        <CardActionArea sx={{ display: "flex"}}>
          <Box sx={{ maxWidth: 370}}>
            <CardMedia
              sx={{
                display: "flex",
                ml: 1,
                flexDirection: "column",
                minWidth: 250,
                maxWidth: 350,
              }}
              component="img"
              image={
                result.items[0].volumeInfo.imageLinks.thumbnail
                  ? result.items[0].volumeInfo.imageLinks.thumbnail
                  : books
              }
              alt="books in library"
            />
            <Button
              sx={{
                mt: 4,
                ml: 2,
                mb: 2,
                width: 330,
                backgroundColor: "rgb(33, 112, 33)",
              }}
              variant="contained"
              onClick={() => {
                addBookToList(
                  {
                    listType: "to_read",
                    bookInfo: result.items[0].volumeInfo,
                    bookId: result.items[0].id,
                    token: token,
                  },
                  location
                );
              }}
            >
              Add to Reading List
            </Button>
            {userType==='paid'? <div><Button
              sx={{
                ml: 2,
                mb: 2,
                width: 330,
                backgroundColor: "rgb(33, 112, 33)",
              }}
              variant="contained"
              onClick={() => {
                addBookToList(
                  {
                    listType: "in_progress",
                    bookInfo: result.items[0].volumeInfo,
                    bookId: result.items[0].id,
                    token: token,
                  },
                  location
                );
              }}
            >
              Add to In-Progress List
            </Button>
            <Button
              sx={{
                ml: 2,
                mb: 2,
                width: 330,
                backgroundColor: "rgb(33, 112, 33)",
              }}
              variant="contained"
              onClick={() => {
                addBookToList(
                  {
                    listType: "finished",
                    bookInfo: result.items[0].volumeInfo,
                    bookId: result.items[0].id,
                    token: token,
                  },
                  location
                );
              }}
            >
              Add to Finished List
            </Button></div> : <></>}
          </Box>
          <CardContent
            sx={{
              display: "flex",
              position: "relative",
              mt: -10,
              ml: 3,
              flexDirection: "column",
              flex: "3 1 auto",
            }}
          >
            <Typography gutterBottom variant="h4" component="div">
              {result.items[0].volumeInfo.title}
              {/*<Link to={`/author/${result.items[0].volumeInfo.authors}`}>*/}
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="text.secondary"
                >
                  {result.items[0].volumeInfo.authors.length === 1
                    ? result.items[0].volumeInfo.authors
                    : result.items[0].volumeInfo.authors.map(
                        (author, index) => {
                          return (<>
                            <Link to={`/author/${author}`}>
                              {author +
                                (index ===
                                result.items[0].volumeInfo.authors.length - 1
                                  ? ""
                                  : ",")}
                            </Link> {" "}</>
                          );
                        }
                      )}
                </Typography>
              {/*</Link>*/}
            </Typography>
            <Typography>{result.items[0].volumeInfo.description}</Typography>
            <Typography sx={{ mt: 3 }}>
              {result.items[0].volumeInfo.publishedDate
                ? "Published in " +
                  result.items[0].volumeInfo.publishedDate +
                  " " +
                  (result.items[0].volumeInfo.publisher
                    ? "by " + result.items[0].volumeInfo.publisher
                    : "")
                : ""}
              {/*Published in {result.items[0].volumeInfo.publishedDate} {}*/}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  ) : (
    <CircularProgress></CircularProgress>
  );
};

export default DetailsPage;
