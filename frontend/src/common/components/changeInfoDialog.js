import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Alert } from "@mui/material";

const ChangeInfoDialog = ({infoOpen, setInfoOpen}) => {
  
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);


    const handleClose = () => {
      setInfoOpen(false);
      setPasswordsMatch(true);
    };

    const handleChangeInfo = () => {
        console.log(newName);
        console.log(newEmail);
        console.log(curPassword);
        console.log(newPassword);
        console.log(confirmPassword);

        if(newPassword !== confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
            setInfoOpen(false);
        }
    }

    return (
        <div>
        <Dialog
          open={infoOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Change Your Information"}
          </DialogTitle>
          <DialogContent>
            <Typography fontWeight="bold">Enter your new name</Typography>
            <TextField fullWidth sx={{mt: 1}} variant="outlined" label="New Name" onChange={(e) => {setNewName(e.target.value)}}/>
            <Typography sx={{mt: 2}} fontWeight="bold">Enter your new email</Typography>
            <TextField fullWidth sx={{mt: 1}} variant="outlined" label="New Email" onChange={(e) => {setNewEmail(e.target.value)}}/>
            <Typography sx={{mt: 2}} fontWeight="bold">Enter your current password as well as your new password</Typography>
            <TextField fullWidth sx={{mt: 1}} variant="outlined" label="Current Password" onChange={(e) => {setCurPassword(e.target.value)}}/>
            <TextField fullWidth sx={{mt: 1.5}} variant="outlined" label="New Password" onChange={(e) => {setNewPassword(e.target.value)}}/>
            <TextField fullWidth sx={{mt: 1.5}} variant="outlined" label="Confirm New Password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={handleChangeInfo}>
              Save Changes
            </Button>
          </DialogActions>

          {passwordsMatch? <></> : <Alert variant="filled" severity="error">Passwords do not match! Please re-enter them</Alert>}
        </Dialog>
      </div>
    );
  }

  export default ChangeInfoDialog;