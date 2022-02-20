import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import copyBlobToClipboard from '../../helpers/copyBlobToClipboard';
import dataURLtoBlob from '../../helpers/dataURLtoBlob';

export default function ShareButton(props) {
  async function shareImage(e) {
    e.stopPropagation();

    if (navigator.share) {
      // WORK PART 1: add image here
      // https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript

      const blobFile = dataURLtoBlob(props.src);
      navigator.share({
        title: `${props.name}`,
        text: 'Created with PAINTY',
        file: [blobFile], 
      });
    } else { // SPLIT THESE 2 INTO 2 BUTTONS: SHARE for mobile and COPY TO CLIPBOARD FOR OTHER
      const blob = dataURLtoBlob(props.src);
      await copyBlobToClipboard(blob);
      setClipboardCopyFeedback(true);
    }
  }

  const [clipboardCopyFeedback, setClipboardCopyFeedback] = useState(false);

  return (
    <span>
      <button className="btn btn-primary ms-1" onClick={shareImage}>
        <span> SHARE </span>
        <i className="fas fa-share"></i>
      </button>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={clipboardCopyFeedback}
        autoHideDuration={parseInt(process.env.REACT_APP_SNACKBAR_LIFE, 10)}
        onClose={() => {
          setClipboardCopyFeedback(false);
        }}
      >
        <Alert
          onClose={() => {
            setClipboardCopyFeedback(false);
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          <p>Image copied to clipboard</p>
        </Alert>
      </Snackbar>
    </span>
  );
}
