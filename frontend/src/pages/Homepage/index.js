import React, { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import bookwormHeader from "./bookworm-header.png";

const getPopularBooks = (setPopularBooks) => {
  fetch(`/api/get-popular-books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {

    return response.json();
  }).then(data => {
    setPopularBooks(data)
  })
}

const getReadingList = (setReadingList, token) => {
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
  return (popularBooks && readingList) ? (
    <div>
      <div className="flex-horizontal flex-center">
        <img fullwidth src={bookwormHeader} style={{width: "50%", height: "15%", marginBottom: 10, marginLeft: -30}}/>
      </div>
      {readingList.length > 0 ? (<><Typography variant="h5" sx={{ mt: 5, mb: 2, maxWidth: 300, borderRadius: 1, backgroundColor: "rgb(33, 112, 33)", color: "white", textAlign: 'center' }}>Books in your Reading List</Typography>
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
      <Typography variant="h5" sx={{ mt: 5, mb: 2, maxWidth: 410, borderRadius: 1, backgroundColor: "rgb(33, 112, 33)", color: "white", textAlign: 'center'  }}>Popular Books with Bookworm Users</Typography>
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
      <div className="flex-horizontal flex-center">
        <img fullwidth src={bookwormHeader} style={{width: "50%", height: "15%", marginBottom: 10, marginLeft: -30}}/>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 2, mt: 3, maxWidth: 250, borderRadius: 1, backgroundColor: "rgb(33, 112, 33)", color: "white", textAlign: 'center' }} variant="h5"><span>What is Bookworm?</span></Typography>
          <Typography variant="h7">
            Bookworm is the app designed for voracious readers and dabblers alike. Our reading lists are designed to keep readers of all ages organized and on track with your reading goals, and our logged-in members can share their profiles, and view their friends'. Premium users can even add to multiple lists!
          </Typography><br/><br/>
          <Typography variant="h7">Our Google Books-based search software also allows you to easily search for that book you've had on your mind by title, author, and other search fields. Once you find it, you can add it to any of your lists with a click, and view other books written by the same author.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ mb: 2, mt: 3, maxWidth: 250, borderRadius: 1, backgroundColor: "rgb(33, 112, 33)", color: "white", textAlign: 'center' }} variant="h5"><span>Why Bookworm?</span></Typography>
          <Typography variant="h7">
            Many readers prefer to track their book lists on paper, through Google Docs, or on Goodreads. However, we envisioned a clean, simple interface that combines a vast, easily-searchable, library with a separate-list structure that isn't easily replicable in hand-written journals or the Docs. We do all this while removing all the noise of ads, reviews, and buyer information found in Goodreads. In the end, we came up with Bookworm, the best of all worlds.
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 5, mb: 2, maxWidth: 650, borderRadius: 1, backgroundColor: "rgb(33, 112, 33)", color: "white", textAlign: 'center' }}>Popular books that users have added to their reading list</Typography>
      <Grid container spacing={7}>
        {popularBooks.map((popularBook) => {
          const imgSrc = popularBook.image
          const isbn = popularBook.isbn
          return (
            <Grid item sm={6} md={4} lg={3} xl={2} sx={{mr: 1}}>
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
