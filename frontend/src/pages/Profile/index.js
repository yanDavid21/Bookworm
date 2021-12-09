import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProfileHeader = ({ username, email, profPicture }) => {
  return (
    <>
      {username ? (
        <div className="flex-center flex-horizontal">
          {profPicture ? (
            <img
              src={profPicture}
              sx={{ width: 200, height: 200 }}
              alt="Profile of ****"
            />
          ) : (
            <AccountCircleIcon
              sx={{ width: 200, height: 200 }}
              alt="Profile of ****"
            />
          )}
          <div className="flex-center flex-vertical">
            <Typography variant="h4">{`Welcome back, ${username}`}</Typography>
            <Typography variant="h5">{`Signed in as:  ${email}`}</Typography>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

const BookCard = ({ listType, isbn, title, author, image }) => {
  const removeItem = (listType, isbn) => {

  };

  const addToNextList = (listType, isbn) => {
    
  };

  const buttonActionText = (listType) => {
    switch (listType) {
      case "Reading List":
        return "Move to In Progress";
      case "In Progress List":
        return "Move to Finished";
      default:
        return "";
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={`${title} by ${author}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            removeItem(listType, isbn);
          }}
        >
          Remove
        </Button>
        <Button
          size="small"
          onClick={() => {
            addToNextList(listType, isbn);
          }}
        >
          {buttonActionText(listType)}
        </Button>
      </CardActions>
    </Card>
  );
};

const BookList = ({ title, list }) => {
  return (
    <div className="flex-vertical book-list-container">
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <div className="book-list">
        {list.map((book) => {
          return (
            <BookCard
              listType={title}
              title={book.title}
              author={book.author}
              image={book.image}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const initState = { readingList: [], inProgressList: [], finishedList: [] };
  const [userData, setUserData] = useState(initState);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  //get user data
  // useEffect(() => {
  //get user data
  //   fetch()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, [userData]);

  //get user email
  //useEffect
  return (
    <div className="profile-page flex-center flex-horizontal">
      <Grid container>
        <Grid item xs={12}>
          <div className="flex-center flex-horizontal">
            <ProfileHeader
              username={username}
              email={email}
              image={image}
            ></ProfileHeader>
          </div>
        </Grid>
        <Grid item xs={12}>
          <BookList title="Reading List" list={userData.readingList}></BookList>
        </Grid>
        <Grid item xs={12}>
          <BookList
            title="In Progress List"
            list={userData.inProgressList}
          ></BookList>
        </Grid>
        <Grid item xs={12}>
          <BookList
            title="Finished List"
            list={userData.finishedList}
          ></BookList>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
