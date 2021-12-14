import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CircularProgress, IconButton, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import ChangeInfoDialog from '../../common/components/changeInfoDialog';
import EnterPasswordDialog from '../../common/components/enterPasswordDialog';
import { useLocation } from "react-router-dom";
// import { fetchBook } from "../Details/index"

const ProfileHeader = ({ name, email, profPicture, token, setEmail, setName, curUser, location }) => {
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [enterPasswordOpen, setEnterPasswordOpen] = React.useState(false);

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
                <Box sx={{justifyContent: 'flex-start'}}>
                  {curUser? <Typography variant="h3">{`Welcome back, ${name}`}</Typography> : <Typography variant="h3">{name}</Typography>}
                  {curUser?
                      <div className="flex-horizontal" sx={{alignItems: 'center'}}>
                        <Typography variant="h5">{`Signed in as:  ${email}`}</Typography>
                        <IconButton onClick={handleEnterPasswordOpen}>
                          <EditIcon color="success" fontSize="inherit"></EditIcon>
                        </IconButton>
                        <EnterPasswordDialog enterPasswordOpen={enterPasswordOpen} setEnterPasswordOpen={setEnterPasswordOpen} token={token} setInfoOpen={setInfoOpen}/>
                        <ChangeInfoDialog infoOpen={infoOpen} setInfoOpen={setInfoOpen} token={token} setEmail={setEmail} setName={setName}/>
                      </div> : <></>}
                  <Button color="success" onClick={() => {navigator.clipboard.writeText('http://localhost:3000' + location.pathname)}}>Copy Profile URL</Button>
                </Box>
              </div>
            </div>
        ) : (
            <CircularProgress />
        )}
      </>
  );
};

const fetchBook = (isbn, setResults, searchType) => {
  console.log("isbn: " + isbn);
  fetch(
      `/api/search?q=${isbn}${isbn ? `&${searchType.toLowerCase()}=${isbn}` : ""}`
  )
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.items[0]);
    setResults(data.items[0]);
  });
};

const BookCard = ({listType, isbn}) => {
  const [result, setResults] = useState({volumeInfo:{title:'', authors:'', thumbnail:''}});
  const searchType = "ISBN";
  console.log(isbn);
  useEffect(() => {
    fetchBook(isbn, setResults, searchType);
  },[]);
  console.log(result)
  const title = result.volumeInfo.title;
  const author = result.volumeInfo.authors;
  const image = result.volumeInfo.thumbnail;
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

  return result ? (
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
  ): <></>;
};

const BookList = ({ title, list }) => {
  return (
      <div className="flex-vertical book-list-container">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <div className="book-list">

          {list.map((isbn) => {
            console.log(isbn)
            return (
                <BookCard
                    listType={title}
                    isbn={isbn}
                />
            );
          })}
        </div>
      </div>
  );
};

async function getCurrentUserProfileData(token,setUserData,setEmail,setName) {
  return fetch('http://localhost:5000/api/get-current-user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(token)
  })
  .then((response) => response.json())
  .then((data) => {
    setEmail(data.email);
    setName(data.name);
    setUserData({readingList: data.to_read, inProgressList:data.in_progress, finishedList:data.finished});
  })
  // .then(response => response.json())
  .catch(err => {
    alert(err);
  });
}

async function getOtherUserProfileData(userId,setUserData,setEmail,setName) {
  return fetch('http://localhost:5000/api/get-other-user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  })
  .then((response) => response.json())
  .then((data) => {
    setUserData({readingList: data.to_read, inProgressList:data.in_progress, finishedList:data.finished});
    setEmail(data.email);
    setName(data.name);
  })
  // .then(response => response.json())
  .catch(err => {
    alert(err);
  });
}

const ProfilePage = ({token, curUser}) => {
  const initState = { readingList: [], inProgressList: [], finishedList: [] };
  const [userData, setUserData] = useState(initState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  let location = useLocation();
  let userId = "";
  if (!curUser) {
    userId= location.pathname.substring(9);
  }
  console.log(userData)

  //get user data
  useEffect(async () => {
    if(curUser) {
      await getCurrentUserProfileData({token},setUserData, setEmail, setName);
    } else {
      await getOtherUserProfileData({userId}, setUserData, setEmail, setName);
    }
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
                  curUser={curUser}
                  location={location}
              ></ProfileHeader>
            </div>
          </Grid>
          <Grid item xs={12}>
            <BookList title="Reading List" list={userData.readingList}/>
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

