import React from 'react';
import { DialogContentText, Typography } from "@mui/material";

const PrivacyPolicyText = ({disagreed}) => {

    return (
        <div>
            <DialogContentText id="alert-dialog-description">
                <Typography sx={{fontWeight: 'bold'}}>Type of information we store:</Typography>
                <Typography sx={{mt: 1}}>When you register as a new user, we store your name, email, password, and user type (basic or premium). 
                    Additionally, we store the information of the books added to your lists in order to help you track your reading progress
                    and also to calculate the popularity of each book. This helps Bookworm make recommendations to each user when they
                    log in.
                </Typography>
                <Typography sx={{fontWeight: 'bold', mt: 2}}>How we store your information:</Typography>
                <Typography sx={{mt: 1}}>
                    In order to ensure that your password is completely protected, we hash every user's password using bcrypt before storing it in our database. 
                    All public information about a user is stored in plaintext.
                </Typography>
                <Typography sx={{fontWeight: 'bold', mt: 2}}>What we do with your information:</Typography>
                <Typography sx={{mt: 1}}>
                At Bookworm, the privacy of our users is a number-one priority. We will never share your password with anyone. 
                However, the public information in your profile, such as your name, email, user type, and book lists are all made available 
                for any other users to view. Additionally, we use every user's reading list to determine which books are most popular at 
                any moment.
                </Typography>
                {
                    disagreed?
                    <Typography sx={{fontWeight: 'bold', mt: 2}}>YOU MUST AGREE WITH OUR PRIVACY POLICY IN ORDER TO USE BOOKWORM</Typography>
                    :
                    <div></div>
                }
            </DialogContentText>
        </div>
    );
  }

  export default PrivacyPolicyText;