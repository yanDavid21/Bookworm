import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import { BACKEND_URL } from "../../App";

async function changeUserInfo(
  newName,
  newEmail,
  newPassword,
  token,
  setEmail,
  setName
) {
  return fetch(`${BACKEND_URL}/api/change-user-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newName, newEmail, newPassword, token }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setEmail(data.newEmail);
      setName(data.newName);
    });
}

const ChangeInfoDialog = ({
  infoOpen,
  setInfoOpen,
  token,
  setEmail,
  setName,
}) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleClose = () => {
    setInfoOpen(false);
    setPasswordsMatch(true);
  };

  const handleChangeInfo = async (e) => {
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      setInfoOpen(false);
      await changeUserInfo(
        newName,
        newEmail,
        newPassword,
        token,
        setEmail,
        setName
      );
    }
  };

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
          <TextField
            fullWidth
            sx={{ mt: 1 }}
            variant="outlined"
            label="New Name"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <Typography sx={{ mt: 2 }} fontWeight="bold">
            Enter your new email
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 1 }}
            variant="outlined"
            label="New Email"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          <Typography sx={{ mt: 2 }} fontWeight="bold">
            Enter your new password
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 1.5 }}
            type="password"
            variant="outlined"
            label="New Password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            fullWidth
            sx={{ mt: 1.5 }}
            type="password"
            variant="outlined"
            label="Confirm New Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleChangeInfo}>Save Changes</Button>
        </DialogActions>

        {passwordsMatch ? (
          <></>
        ) : (
          <Alert variant="filled" severity="error">
            Passwords do not match! Please re-enter them
          </Alert>
        )}
      </Dialog>
    </div>
  );
};

export default ChangeInfoDialog;
