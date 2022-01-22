// https://codesandbox.io/s/react-router-6-use-prompt-use-blocker-kce6k?file=/example.js:3164-3217

import React, { useState, useEffect, useCallback } from "react";
import {
  useBlocker,
  useNavigate,
  useLocation
} from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  function useCallbackPrompt(when) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const cancelNavigation = useCallback(() => {
      setShowPrompt(false);
    }, []);

    const handleBlockedNavigation = useCallback(
      nextLocation => {
        if (
          !confirmedNavigation &&
          nextLocation.location.pathname !== location.pathname
        ) {
          setShowPrompt(true);
          setLastLocation(nextLocation);
          return false;
        }
        return true;
      },
      [confirmedNavigation]
    );

    const confirmNavigation = useCallback(() => {
      setShowPrompt(false);
      setConfirmedNavigation(true);
    }, []);

    useEffect(() => {
      if (confirmedNavigation && lastLocation) {
        navigate(lastLocation.location.pathname);
      }
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
  }

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(
    props.isBlocking
  );
  return (
    <Dialog
      open={showPrompt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title || "Unsaved Changes"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { 
            props.text || 
            'It looks like you have been editing something. If you leave before saving, your changes will be lost.'
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmNavigation} color="primary">
          {props.confirmButtonText || 'Yes'}
        </Button>
        <Button onClick={cancelNavigation} color="primary" autoFocus>
          {props.cancelButtonText || ' Back to Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

