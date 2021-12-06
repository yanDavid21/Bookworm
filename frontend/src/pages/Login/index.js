import React from "react";
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
  return <div>
    <Box sx={{width: "50%"}}>
      <TextField fullWidth label="Username" id="username-field" />
      <TextField fullWidth label="Password" id="fullWidth" sx={{mt: 1.5}}/>
      <Button variant="contained" sx={{width: "100%", mt: 1.5, backgroundColor: "rgb(33, 112, 33)"}}>Login</Button>
      <Button variant="contained" sx={{width: "100%", mt: 1.5, backgroundColor: "rgb(150, 150, 150)"}}>Sign Up</Button>
    </Box>
  </div>;
};

export default LoginPage;
