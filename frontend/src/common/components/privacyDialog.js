import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import PrivacyPolicyText from './privacyPolicyText';

const PrivacyDialog = ({privacyOpen, setPrivacyOpen}) => {
  
    const handleClose = () => {
      setPrivacyOpen(false);
    };

    return (
        <div>
        <Dialog
          open={privacyOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bookworm's Privacy Policy"}
          </DialogTitle>
          <DialogContent>
              {/* <DialogContentText id="alert-dialog-description">Here is our privacy policy: blah blah blah.</DialogContentText> */}
              <PrivacyPolicyText disagreed={false} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default PrivacyDialog;