import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CircularProgress, IconButton, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import ChangeInfoDialog from "../../common/components/changeInfoDialog";
import EnterPasswordDialog from "../../common/components/enterPasswordDialog";
import { Link, useLocation } from "react-router-dom";

const ProfileHeader = ({
  name,
  email,
  profPicture,
  token,
  setEmail,
  setName,
  curUser,
  location,
  userId,
  setHistory,
}) => {
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [enterPasswordOpen, setEnterPasswordOpen] = React.useState(false);
  const pathName =
    "http://localhost:3000" +
    (curUser ? "/profile/" + userId : location.pathname);

  if (!curUser && !token) {
    setHistory(location.pathname);
  }

  const handleEnterPasswordOpen = (e) => {
    e.preventDefault();
    setEnterPasswordOpen(true);
  };

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
            <Box sx={{ justifyContent: "flex-start" }}>
              {curUser ? (
                <Typography variant="h3">{`Welcome back, ${name}`}</Typography>
              ) : (
                <Typography variant="h3">{name}</Typography>
              )}
              {curUser ? (
                <div className="flex-horizontal" sx={{ alignItems: "center" }}>
                  <Typography variant="h5">{`Signed in as:  ${email}`}</Typography>
                  <IconButton onClick={handleEnterPasswordOpen}>
                    <EditIcon color="success" fontSize="inherit"></EditIcon>
                  </IconButton>
                  <EnterPasswordDialog
                    enterPasswordOpen={enterPasswordOpen}
                    setEnterPasswordOpen={setEnterPasswordOpen}
                    token={token}
                    setInfoOpen={setInfoOpen}
                  />
                  <ChangeInfoDialog
                    infoOpen={infoOpen}
                    setInfoOpen={setInfoOpen}
                    token={token}
                    setEmail={setEmail}
                    setName={setName}
                  />
                </div>
              ) : (
                <></>
              )}
              <Button
                sx={{ backgroundColor: "rgb(33, 112, 33)" }}
                variant="contained"
                onClick={() => {
                  navigator.clipboard.writeText(pathName);
                }}
              >
                Copy Profile URL
              </Button>
            </Box>
            {token ? (
              <></>
            ) : (
              <Link to="/login" className="no-text-decoration">
                <Button
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "rgb(33, 112, 33)" }}
                >
                  Log in to view this person's lists
                </Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <CircularProgress sx={{ mt: 2 }} />
      )}
    </>
  );
};

const fetchBook = (isbn, setResults, searchType) => {
  fetch(
    `/api/search?q=${isbn}${isbn ? `&${searchType.toLowerCase()}=${isbn}` : ""}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setResults(data.items[0]);
    });
};

const convertToBackendName = (listType) => {
  switch (listType) {
    case "Reading List":
      return "to_read";
    case "In Progress List":
      return "in_progress";
    case "Finished List":
      return "finished";
    default:
      return "";
  }
};

const convertToFrontEndName = (listType) => {
  switch (listType) {
    case "Reading List":
      return "readingList";
    case "In Progress List":
      return "inProgressList";
    case "Finished List":
      return "finishedList";
    default:
      return "";
  }
};

const BookCard = ({ listType, isbn, userData, setUserData, token }) => {
  const [result, setResults] = useState({
    volumeInfo: { title: "", authors: [], thumbnail: "" },
  });
  const searchType = "ISBN";
  useEffect(() => {
    fetchBook(isbn, setResults, searchType);
  }, []);
  const title = result.volumeInfo.title;
  const author = result.volumeInfo.authors;
  const image = result.volumeInfo.imageLinks?.thumbnail;

  const removeItem = (listType, isbn) => {
    fetch("/api/book", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        listType: convertToBackendName(listType),
        isbn,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw Error("Error updating your list.");
        }
        let updatedList = userData[convertToFrontEndName(listType)].filter(
          (listItem) => listItem !== isbn
        );
        let field = convertToFrontEndName(listType);
        setUserData({ ...userData, [field]: updatedList });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addToNextList = (listType, isbn) => {};

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
    <Card sx={{ width: 260, mt: 2 }}>
      <Link to={`/details/${isbn}`} className="unstyled-link">
        <CardMedia
          component="img"
          height="360"
          //padding-top={360-image.height}
          maxWidth="260"
          image={image}
          alt={`${title} by ${author}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author === 1
              ? author
              : author.map((auth, index) => {
                  return (
                    <>
                      <Link to={`/author/${auth}`} color="text.secondary">
                        {auth + (index === author.length - 1 ? "" : ",")}
                      </Link>{" "}
                    </>
                  );
                })}
          </Typography>
        </CardContent>
      </Link>
      <CardActions
        sx={{
          backgroundColor: "rgba(33, 112, 33, 0.76)",
          color: "white",
          pl: 3,
          pr: 3,
          pt: 1,
          pb: 1,
        }}
      >
        <Button
          size="small"
          onClick={() => {
            removeItem(listType, isbn);
          }}
          sx={{ color: "white" }}
        >
          Remove
        </Button>
        <Button
          size="small"
          onClick={() => {
            addToNextList(listType, isbn);
          }}
          sx={{ color: "white", pl: 2, pr: 2 }}
        >
          {buttonActionText(listType)}
        </Button>
      </CardActions>
    </Card>
  ) : (
    <></>
  );
};

const BookList = ({ title, list, userData, setUserData, token }) => {
  const myRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.substring(1);
    if (id === convertToFrontEndName(title)) {
      console.log("here");
      window.scrollTo({
        top: myRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }, [location.hash]);

  return (
    <div className="flex-vertical book-list-container" ref={myRef}>
      <Typography
        sx={{
          mt: 4,
          mb: -1,
          width: 260,
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: "rgb(33, 112, 33)",
          color: "white",
        }}
        variant="h4"
        component="div"
      >
        {title}
      </Typography>
      {list ? (
        <div className="book-list">
          <Grid container spacing={10} sx={{ mt: 1, pl: 10 }}>
            {list.map((isbn) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    pb: 1,
                    pr: 4,
                    flexDirection: "column",
                  }}
                >
                  <BookCard
                    listType={title}
                    isbn={isbn}
                    userData={userData}
                    setUserData={setUserData}
                    token={token}
                  />
                </Box>
              );
            })}
          </Grid>
        </div>
      ) : (
        <CircularProgress sx={{ mt: 2 }} />
      )}
    </div>
  );
};

async function getCurrentUserProfileData(
  token,
  setUserData,
  setEmail,
  setName,
  setUserId
) {
  return (
    fetch("http://localhost:5000/api/get-current-user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.email);
        setName(data.name);
        setUserData({
          readingList: data.to_read,
          inProgressList: data.in_progress,
          finishedList: data.finished,
        });
        setUserId(data._id);
      })
      // .then(response => response.json())
      .catch((err) => {
        alert(err);
      })
  );
}

async function getOtherUserProfileData(
  userId,
  setUserData,
  setEmail,
  setName,
  setOtherUserType
) {
  return (
    fetch("http://localhost:5000/api/get-other-user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          readingList: data.to_read,
          inProgressList: data.in_progress,
          finishedList: data.finished,
        });
        setEmail(data.email);
        setName(data.name);
        setOtherUserType(data.userType);
        console.log(JSON.stringify(data));
        console.log("other users type: " + data.userType);
      })
      // .then(response => response.json())
      .catch((err) => {
        alert(err);
      })
  );
}

const ProfilePage = ({ token, curUser, userType, setHistory }) => {
  const initState = {
    readingList: null,
    inProgressList: null,
    finishedList: null,
  };
  const [userData, setUserData] = useState(initState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [otherUserType, setOtherUserType] = useState("");

  let location = useLocation();
  useEffect(() => {
    if (!curUser) {
      setUserId(location.pathname.substring(9));
    }
  }, []);

  //get user data
  useEffect(async () => {
    if (curUser) {
      await getCurrentUserProfileData(
        { token },
        setUserData,
        setEmail,
        setName,
        setUserId
      );
    } else {
      await getOtherUserProfileData(
        { userId },
        setUserData,
        setEmail,
        setName,
        setOtherUserType
      );
    }
  }, [userId]);

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
              userId={userId}
              setHistory={setHistory}
            ></ProfileHeader>
          </div>
        </Grid>
        {token ? (
          <Grid item sx={{ mt: 3 }}>
            <BookList
              title="Reading List"
              list={userData.readingList}
              userData={userData}
              setUserData={setUserData}
              token={token}
            />
          </Grid>
        ) : (
          <></>
        )}
        {token &&
        ((curUser && userType === "paid") ||
          (!curUser && otherUserType === "paid")) ? (
          <>
            <Grid item xs={12}>
              {" "}
              <BookList
                title="In Progress List"
                list={userData.inProgressList}
                userData={userData}
                setUserData={setUserData}
                token={token}
              ></BookList>
            </Grid>
            <Grid item xs={12}>
              <BookList
                title="Finished List"
                list={userData.finishedList}
                userData={userData}
                setUserData={setUserData}
                token={token}
              ></BookList>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export default ProfilePage;
