import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { Button, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';

async function registerUser(credentials) {
  return fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
 }


const SignupPage = ({ token, setToken, lastPath, userType, setUserType }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    if (name !== '' && email !== '' && password !== '' && (userType === 'paid' || userType === 'free')) {
      const promise = registerUser({
        name,
        email,
        password,
        userType
      })

      promise.then(response => {
        if(response.status === 409)
          throw Error("Email already exists. Please choose another");
        return response.json()
      })
      .then(data => {
        setToken(data);
      })
      .catch(err => alert(err))
    }
  }

  if(token) {
    return (
      <Navigate to={lastPath}/>
    );
  }

  return (
    <div>
      <Box sx={{width: "50%"}}>
        <TextField fullWidth label="Name" id="name-field" onChange={e => setName(e.target.value)}/>
        <TextField fullWidth label="Email" id="email-field" sx={{mt: 1.5}} onChange={e => setEmail(e.target.value)}/>
        <TextField fullWidth label="Password" type="password" id="password-field" sx={{mt: 1.5, mb: 1.5}} onChange={e => setPassword(e.target.value)}/>
        
        <FormControl component="fieldset">
            <FormLabel component="legend">What kind of user would you like to be?</FormLabel>
            <RadioGroup row aria-label="user-type" name="row-radio-buttons-group" onChange={e => setUserType({userType: e.target.value})} value={userType}>
              <FormControlLabel value="free" control={<Radio />} label="Free" />
              <FormControlLabel value="paid" control={<Radio />} label="Paid" />
            </RadioGroup>
        </FormControl>

        <Button variant="contained" sx={{width: "100%", mt: 1.5, backgroundColor: "rgb(33, 112, 33)"}} onClick={handleSubmit}>Sign Up</Button>
      </Box>
    </div>
  );
};

SignupPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default SignupPage;