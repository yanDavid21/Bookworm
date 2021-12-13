import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CircularProgress, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import ChangeInfoDialog from '../../common/components/changeInfoDialog';
import EnterPasswordDialog from '../../common/components/enterPasswordDialog';

const ProfileHeader = ({ name, email, profPicture, token, setEmail, setName }) => {
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [enterPasswordOpen, setEnterPasswordOpen] = React.useState(false);

  const handleInfoOpen = (e) => {
    e.preventDefault();
    setInfoOpen(true);
  }

  const handleEnterPasswordOpen = (e) => {
    e.preventDefault();
    setEnterPasswordOpen(true);
  }

  return (
    <>
      {name ? (
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
          <div className="flex-vertical">
            <Typography variant="h3">{`Welcome back, ${name}`}</Typography>
            <div className="flex-horizontal" sx={{alignItems: 'center'}}>
              <Typography variant="h5">{`Signed in as:  ${email}`}</Typography>
              <IconButton onClick={handleEnterPasswordOpen}>
                <EditIcon color="success" fontSize="inherit"></EditIcon>
              </IconButton>
              <EnterPasswordDialog enterPasswordOpen={enterPasswordOpen} setEnterPasswordOpen={setEnterPasswordOpen} token={token} setInfoOpen={setInfoOpen}/>
              <ChangeInfoDialog infoOpen={infoOpen} setInfoOpen={setInfoOpen} token={token} setEmail={setEmail} setName={setName}/>
            </div>
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

async function getProfileData(token,setUserData,setEmail,setName) {
  return fetch('http://localhost:5000/api/get-user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(token)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setEmail(data.email);
      setName(data.name);
      setUserData({readingList: data.to_read, inProgressList:data.in_progress, finishedList:data.finished});
    })
    // .then(response => response.json())
    .catch(err => {
      alert(err);
    });
 }

const ProfilePage = ({token}) => {
  const initState = { readingList: [], inProgressList: [], finishedList: [] };
  const [userData, setUserData] = useState(initState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  //get user data
  useEffect(async () => {
    await getProfileData({token},setUserData, setEmail, setName);

    console.log(email);
  }, []);

  return (
    <div className="profile-page flex-center flex-horizontal">
      <Grid container>
        <Grid item xs={12}>
          <div className="flex-horizontal">
            <ProfileHeader
              name={name}
              email={email}
              image={image}
              token={token}
              setEmail={setEmail}
              setName={setName}
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
