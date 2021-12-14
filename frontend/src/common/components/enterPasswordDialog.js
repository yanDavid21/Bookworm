import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Alert } from "@mui/material";

async function enterPassword(enteredPassword, token) {
  return fetch('http://localhost:5000/api/enter-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({enteredPassword, token})
  })
 }

const EnterPasswordDialog = ({enterPasswordOpen, setEnterPasswordOpen, token, setInfoOpen}) => {
  
    const [enteredPassword, setEnteredPassword] = React.useState('');
    const [incorrectPassword, setIncorrectPassword] = React.useState(false);


    const handleClose = () => {
      setEnterPasswordOpen(false);
      setIncorrectPassword(false);
    };

    const handleSubmitPassword = e => {
        e.preventDefault();
        const promise = enterPassword(enteredPassword, token);

        promise.then(response => {
            if(response.status === 403) {
                setIncorrectPassword(true);
            } else {
                setIncorrectPassword(false);
                setEnterPasswordOpen(false);
                setInfoOpen(true);
                return response.json();
            }
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
        <div>
        <Dialog
          open={enterPasswordOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Enter Your Password"}
          </DialogTitle>
          <DialogContent>
            <Typography fontWeight="bold">Enter your password so that you may change your profile information</Typography>
            <TextField fullWidth sx={{mt: 1}} variant="outlined" label="Password" onChange={(e) => {setEnteredPassword(e.target.value)}}/>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={handleSubmitPassword}>
              Confirm
            </Button>
          </DialogActions>

          {incorrectPassword? <Alert variant="filled" severity="error">Incorrect password! Please try again.</Alert> : <></> }

        </Dialog>
      </div>
    );
  }

  export default EnterPasswordDialog;