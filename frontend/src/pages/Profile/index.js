import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

const ProfileHeader = () => {
  return <div>profile</div>;
};

const ReadingList = () => {
  return <div>reading</div>;
};

const InProgressList = () => {
  return <div>in progress</div>;
};

const FinishedList = () => {
  return <div>finished</div>;
};

const ProfilePage = () => {
  const initState = { readingList: [], inProgressList: [], finishedList: [] };
  const [userData, setUserData] = useState(initState);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    //get user data
  }, []);
  return (
    <div className="profile-page flex-center flex-horizontal">
      <Grid container>
        <Grid item xs={12}>
          <div className="flex-center flex-horizontal">
            <ProfileHeader
              userName={username}
              email={email}
              image={image}
            ></ProfileHeader>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="flex-center flex-horizontal">
            <ReadingList list={userData.readingList}></ReadingList>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="flex-center flex-horizontal">
            <InProgressList list={userData.inProgressList}></InProgressList>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="flex-center flex-horizontal">
            <FinishedList list={userData.finishedList}></FinishedList>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
