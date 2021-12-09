import React from "react";
import { Link } from 'react-router-dom';
import { Button, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import TextField from "@mui/material/TextField";

const SignupPage = () => {
    return <div>
    <Box sx={{width: "50%"}}>
      <TextField fullWidth label="Name" id="name-field" />
      <TextField fullWidth label="Email" id="email-field" sx={{mt: 1.5}}/>
      <TextField fullWidth label="Password" id="password-field" sx={{mt: 1.5, mb: 1.5}}/>
      
      <FormControl component="fieldset">
          <FormLabel component="legend">What kind of user would you like to be?</FormLabel>
          <RadioGroup row aria-label="user-type" name="row-radio-buttons-group">
            <FormControlLabel value="female" control={<Radio />} label="Basic" />
            <FormControlLabel value="male" control={<Radio />} label="Premium" />
          </RadioGroup>
      </FormControl>

      <Button variant="contained" sx={{width: "100%", mt: 1.5, backgroundColor: "rgb(33, 112, 33)"}} component={Link} to="/signup">Sign Up</Button>
    </Box>
  </div>;
};

export default SignupPage;