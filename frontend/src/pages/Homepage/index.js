import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const getPopularBooks = (setPopularBooks) => {
  console.log("pre fetch")
  fetch(`/api/get-popular-books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {

    return response.json();
  }).then(data => {
    console.log("RESPONSE:")
    console.log(data)
    setPopularBooks(data)
  })
}

const getReadingList = (setReadingList, token) => {
  console.log("Getting reading list")
  fetch(`/api/get-reading-list`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  }).then((response) => {
    return response.json();
  }).then(data => {
    setReadingList(data)
  })
}

const Homepage = ({ token }) => {
  const [popularBooks, setPopularBooks] = useState(null)
  useEffect(() => {
    getPopularBooks(setPopularBooks)
  }, [setPopularBooks])
  console.log(popularBooks);
  if (!token) {
    return (
      <UnloggedIn popularBooks={popularBooks} />
    );
  }

  return (
    <LoggedIn popularBooks={popularBooks} token={token} />
  );
};

const LoggedIn = ({ popularBooks, token }) => {
  const [readingList, setReadingList] = useState(null)
  useEffect(() => {
    getReadingList(setReadingList, token)
  }, [setReadingList])
  console.log(readingList)
  return (popularBooks && readingList) ? (
    <div>
      <Typography variant="h3">Bookworm</Typography>
      {readingList.length > 0 ? (<><Typography variant="h5" sx={{ mt: 5, mb: 2 }}>Books in your reading list</Typography>
        <Grid container spacing={10}>
          {readingList.map((readingListItem) => {
            const imgSrc = readingListItem.image
            const isbn = readingListItem.isbn
            return (
              <Grid item sm={6} md={4} lg={3} xl={2}>
                <Link to={`/details/${isbn}`}>
                  <img src={imgSrc} width="200" />
                </Link>
              </Grid>

            )
          })}
        </Grid></>) : <></>}
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>Popular books with Bookworm users</Typography>
      <Grid container spacing={10}>
        {popularBooks.map((popularBook) => {
          const imgSrc = popularBook.image
          const isbn = popularBook.isbn
          return (

            <Grid item sm={6} md={4} lg={3} xl={2}>
              <Link to={`/details/${isbn}`}>
                <img src={imgSrc} width="200" />
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  ) : (
    <CircularProgress></CircularProgress>
  );
}
const UnloggedIn = ({ popularBooks }) => {
  return popularBooks ? (
    <div>
      <Typography variant="h3">Bookworm</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 2, mt: 3 }} variant="h5"><span>What is bookworm?</span></Typography>
          <Typography variant="h7" sx={{textAlign: "justify"}}>
            For readers of all ages, Bookworm is the app designed for voracious readers and dabblers alike. Our reading lists are designed to keep you organized and on track with your reading goals, and premium users have the option to see other people's lists as well as their own. Our Google Books-based search software also allows you to easily search for the book you've had on your mind by title, author, or other search fields. Once you find it, you can add it to any of your lists with a click, and view other books written by the same author.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ mb: 2, mt: 3 }} variant="h5"><span>Why is bookworm?</span></Typography>
          <Typography variant="h7">


            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id fringilla felis. In mollis purus a ex lobortis, vitae feugiat est varius. Nunc eu iaculis nulla, a rhoncus nisi. Fusce a tempus sem, eget eleifend turpis. Suspendisse nec consectetur leo. Nam pharetra eros nibh, eget consectetur leo pretium eget.
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>Popular books that users have added to their reading list</Typography>
      <Grid container spacing={10}>
        {popularBooks.map((popularBook) => {
          const imgSrc = popularBook.image
          const isbn = popularBook.isbn
          return (
            <Grid item sm={6} md={4} lg={3} xl={2}>
              <Link to={`/details/${isbn}`}>
                <img src={imgSrc} width="200" />
              </Link>
            </Grid>

          )
        })}
      </Grid>
    </div>
  ) : (
    <CircularProgress></CircularProgress>
  );
}

export default Homepage;
