import React, { useEffect, useState } from "react";
import ShareModal from "../Modal/ShareModal";

export default function ShareButton(props) {
  function shareImage(e) {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: 'Image',
        text: 'Something is texty here'
      })
    } else {
      setOpen(true);
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

      <ShareModal 
        handleClose={handleClose}
        open={open} 
      />
    </span>
  );
}
