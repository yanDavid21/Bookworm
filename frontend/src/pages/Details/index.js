import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Snackbar, Alert } from "@mui/material";
import books from "./books.jpeg";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { BACKEND_URL } from "../../App";

export const fetchBook = (isbn, setResults, searchType) => {
  fetch(
    `${BACKEND_URL}/api/search?q=${isbn}${
      isbn ? `&${searchType.toLowerCase()}=${isbn}` : ""
    }`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setResults(data);
    });
};

const addBookToList = (bodyParams, location, setSnackbarOpen, setInList) => {
  const isbn = location.pathname.substring(9);
  bodyParams.isbn = isbn;
  fetch(`${BACKEND_URL}/api/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParams),
  }).then((response) => {
    if (response.status === 200) {
      setSnackbarOpen(true);
      setInList(true);
    } else {
      console.log("Failed to add book.");
    }
  });
};

const DetailsPage = ({ token, userType }) => {
  let location = useLocation();
  const [result, setResult] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const searchType = "ISBN";
  useEffect(() => {
    fetchBook(location.pathname.substring(9), setResult, searchType);
  }, [location, setResult]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const [inReadingList, setInReadingList] = useState(false);
  const [inProgressList, setInProgressList] = useState(false);
  const [inFinishedList, setInFinishedList] = useState(false);

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
          const isbn = location.pathname.substring(9);
          setInReadingList(data.to_read.includes(isbn));
          if (userType === "paid") {
            setInProgressList(data.in_progress.includes(isbn));
            setInFinishedList(data.finished.includes(isbn));
          }
        })
        .catch((err) => {
          alert("Token: " + err);
        });
    }
  }, [token]);

  return result ? (
    <div>
      <Card sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box sx={{ maxWidth: 370 }}>
          <CardMedia
            sx={{
              display: "flex",
              ml: 1,
              flexDirection: "column",
              minWidth: 250,
              maxWidth: 350,
              maxHeight: 500,
            }}
            component="img"
            image={
              result.items[0].volumeInfo.imageLinks.thumbnail
                ? result.items[0].volumeInfo.imageLinks.thumbnail
                : books
            }
            alt="books in library"
          />
          {inReadingList ? (
            <Button
              sx={{
                mt: 4,
                ml: 2,
                mb: 2,
                width: 330,
                backgroundColor: "rgb(200, 200, 200)",
              }}
              variant="disabled"
            >
              Add to Reading List
            </Button>
          ) : (
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
                  location,
                  setSnackbarOpen,
                  setInReadingList
                );
              }}
            >
              Add to Reading List
            </Button>
          )}
          {userType === "paid" ? (
            <div>
              {inProgressList ? (
                <Button
                  sx={{
                    ml: 2,
                    mb: 2,
                    width: 330,
                    backgroundColor: "rgb(200, 200, 200)",
                  }}
                  variant="disabled"
                >
                  In your In-Progress List
                </Button>
              ) : (
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
                        listType: "in_progress",
                        bookInfo: result.items[0].volumeInfo,
                        bookId: result.items[0].id,
                        token: token,
                      },
                      location,
                      setSnackbarOpen,
                      setInProgressList
                    );
                  }}
                >
                  Add to In-Progress List
                </Button>
              )}
              {inFinishedList ? (
                <Button
                  sx={{
                    ml: 2,
                    mb: 2,
                    width: 330,
                    backgroundColor: "rgb(200,200,200)",
                  }}
                  variant="disabled"
                >
                  In Your Finished List
                </Button>
              ) : (
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
                      location,
                      setSnackbarOpen,
                      setInFinishedList
                    );
                  }}
                >
                  Add to Finished List
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <CardContent
            sx={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              ml: 3,
            }}
          >
            <Typography gutterBottom variant="h4">
              {result.items[0].volumeInfo.title}
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="text.secondary"
              >
                {result.items[0].volumeInfo.authors.length === 1 ? (
                  <Link to={`/author/${result.items[0].volumeInfo.authors}`}>
                    {result.items[0].volumeInfo.authors}
                  </Link>
                ) : (
                  result.items[0].volumeInfo.authors.map((author, index) => {
                    return (
                      <>
                        <Link to={`/author/${author}`}>
                          {author +
                            (index ===
                            result.items[0].volumeInfo.authors.length - 1
                              ? ""
                              : ",")}
                        </Link>{" "}
                      </>
                    );
                  })
                )}
              </Typography>
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
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleSnackbarClose}
        >
          Added book to list!
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <CircularProgress></CircularProgress>
  );
};

export default DetailsPage;
