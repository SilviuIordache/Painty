import React, { useState } from 'react';
import Toast from "../Toast/Toast";
import copyBlobToClipboard from '../../helpers/copyBlobToClipboard';
import dataURLtoBlob from '../../helpers/dataURLtoBlob';

export default function ShareButton(props) {
  async function shareImage(e) {
    e.stopPropagation();

    if (navigator.share) {
      const blob = dataURLtoBlob(props.src);
      const imageFile = new File([blob], props.name, { type: blob.type });

      const website = 'https://painty-app.herokuapp.com/';
      const fileLink = 'https://ibb.co/10s8bM6';
      const shareText = `
        Created on ${website}.\n
        Checkout my daily Drawdle for the word "${props.name}":\n
        ${fileLink}
      `;

      navigator.share({
        title: `${props.name}`,
        text: shareText,
        file: [imageFile],
      });
    } else {
      // SPLIT THESE 2 INTO 2 BUTTONS: SHARE for mobile and COPY TO CLIPBOARD FOR OTHER
      const blob = dataURLtoBlob(props.src);
      await copyBlobToClipboard(blob);
      setCopied(true);
    }
  }

  const [copied, setCopied] = useState(false);

  return (
    <span>
      <button className="btn btn-primary ms-1" onClick={shareImage}>
        <span> SHARE </span>
        <i className="fas fa-share"></i>
      </button>

      <Toast
        show={copied}
        showCb={setCopied}
        message={<p>Image copied to clipboard</p>}
      />
    </span>
  );
}
