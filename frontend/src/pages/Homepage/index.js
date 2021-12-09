import React from "react";
import { Typography, Grid } from "@mui/material";

const Homepage = ({token}) => {
  console.log('token: ' + token);
  if(!token) {
    return (
      <UnloggedIn />
    );
  }

  return (
    <LoggedIn />
  );
};

const LoggedIn = () => {
  return (
    <div>
    <Typography variant="h3">Bookworm</Typography>     
    
    <Typography variant="h5" sx={{mt: 5, mb: 2}}>Books that have been searched a lot recently...</Typography>
    <Grid container spacing={2}>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
    </Grid>

    <Typography variant="h5" sx={{mt: 5, mb: 2}}>Books that you and your friends have added to their lists recently...</Typography>
    <Grid container spacing={2}>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
    </Grid>
  </div>
  );
}
const UnloggedIn = () => {
  return (
    <div>
    <Typography variant="h3">Bookworm</Typography>     

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography sx={{mb: 2, mt: 3}} variant="h5"><span>What is bookworm?</span></Typography>
        <Typography variant="h7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id fringilla felis. In mollis purus a ex lobortis, vitae feugiat est varius. Nunc eu iaculis nulla, a rhoncus nisi. Fusce a tempus sem, eget eleifend turpis. Suspendisse nec consectetur leo. Nam pharetra eros nibh, eget consectetur leo pretium eget.
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{mb: 2, mt: 3}} variant="h5"><span>Why is bookworm?</span></Typography>
        <Typography variant="h7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id fringilla felis. In mollis purus a ex lobortis, vitae feugiat est varius. Nunc eu iaculis nulla, a rhoncus nisi. Fusce a tempus sem, eget eleifend turpis. Suspendisse nec consectetur leo. Nam pharetra eros nibh, eget consectetur leo pretium eget.
        </Typography>
      </Grid>
    </Grid>
    
    <Typography variant="h5" sx={{mt: 5, mb: 2}}>Books that have been searched a lot recently...</Typography>
    <Grid container spacing={2}>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item xs={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
    </Grid>
  </div>
  );
}

export default Homepage;
