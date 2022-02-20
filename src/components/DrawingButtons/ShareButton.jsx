import React, { useState } from "react";
import ShareModal from "../Modal/ShareModal";
import Alert from "@mui/material/Alert";

export default function ShareButton(props) {
  function shareImage(e) {
    e.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: `Created with painty: ${props.name}`,
        text: "Something is texty here",
        file: {} /// CONTINUE HERE <----- find a way to get the dataURL string here
      });
    } else {
      // setOpen(true);
      // copy image + text to clipboard
    }
  }

  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  return (
    <span>
      <button className="btn btn-primary ms-1" onClick={shareImage}>
        <span> SHARE </span>
        <i className="fas fa-share"></i>
      </button>

      {/* <ShareModal 
        handleClose={handleClose}
        open={open} 
      /> */}

    </span>
  );
}
