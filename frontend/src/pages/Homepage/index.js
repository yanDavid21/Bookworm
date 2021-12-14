import React, {useEffect, useState} from "react";
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

const Homepage = ({token}) => {
  const [popularBooks, setPopularBooks] = useState(null)
  useEffect(() => {
    getPopularBooks(setPopularBooks)
  }, [setPopularBooks])
  console.log(popularBooks);
  if(!token) {
    return (
      <UnloggedIn popularBooks={popularBooks}/>
    );
  }

  return (
    <LoggedIn popularBooks={popularBooks}/>
  );
};

const LoggedIn = ({popularBooks}) => {
  console.log(popularBooks);
  return popularBooks ? (
    <div>
    <Typography variant="h3">Bookworm</Typography>     
    
    <Typography variant="h5" sx={{mt: 5, mb: 2}}>Books that have been popular in searches recently...</Typography>
    <Grid container spacing={10}>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
    </Grid>

    <Typography variant="h5" sx={{mt: 5, mb: 2}}>Popular books with Bookworm users</Typography>
    <Grid container spacing={10}>
    {popularBooks.map((popularBook) => {
        const imgSrc = popularBook.image
        
        return (
        <Grid item sm={6} md={4} lg={3} xl={2}>
          <Link to={`/details/${popularBook.isbn}`}>
            <img src={imgSrc} width="200"/>
          </Link>
        </Grid>
        )
        

      })}
    {/* <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid> */}
    </Grid>
  </div>
  ) : (
    <CircularProgress></CircularProgress>
  );
}
const UnloggedIn = ({popularBooks}) => {
  return popularBooks ? (
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
    
    <Typography variant="h5" sx={{mt: 5, mb: 2}}>Books that have been popular in searches recently...</Typography>
    <Grid container spacing={10}>
    {popularBooks.map((popularBook) => {
        const imgSrc = popularBook.image
        return <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src={imgSrc} width="200"/>
        </Grid>
      })}
    {/* <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid>
      <Grid item sm={6} md={4} lg={3} xl={2}>
          <img src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" width="200"/>
      </Grid> */}
    </Grid>
  </div>
  ) : (
    <CircularProgress></CircularProgress>
  );
}

export default Homepage;
