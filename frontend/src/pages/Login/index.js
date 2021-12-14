import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
 }

const LoginPage = ({ token, setToken, lastPath, setUserType}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    const promise = loginUser({
      email,
      password
    });

    promise.then(response => {
      //check for 403 status before getting the json :)
      if(response.status === 403)
        throw Error("Invalid email and/or password.")
      return response.json()
    })
    .then(data => {
      setToken(data)
      setUserType(data);
    }).catch(err => {
      alert(err)
    })
    
  }
  
  if(token) {
    return (
      <Navigate to={lastPath}/>
    );
  }

  return <div>
    <Box sx={{width: "50%"}}>
      <TextField fullWidth label="Email" id="email-field" onChange={e => setEmail(e.target.value)}/>
      <TextField fullWidth label="Password" type="password" id="password-field" sx={{mt: 1.5}} onChange={e => setPassword(e.target.value)}/>
      <Button variant="contained" sx={{width: "100%", mt: 1.5, backgroundColor: "rgb(33, 112, 33)"}} onClick={handleSubmit}>Login</Button>
      <Button variant="contained" sx={{width: "100%", mt: 1.5, backgroundColor: "rgb(150, 150, 150)"}} component={Link} to="/register">Sign Up</Button>
    </Box>
  </div>;
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage;
