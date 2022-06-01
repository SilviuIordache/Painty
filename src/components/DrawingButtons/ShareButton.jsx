import React from 'react';
import copyBlobToClipboard from '../../helpers/copyBlobToClipboard';
import dataURLtoBlob from '../../helpers/dataURLtoBlob';

export default function ShareButton(props) {

  async function copyImageToClipboard(e) {
    e.stopPropagation();
    const img = document.getElementById(props.id);
    console.log(img.src);
    const blob = dataURLtoBlob(img.src);
    await copyBlobToClipboard(blob);
  }


  return (
    <span>
      <button className="btn btn-primary ms-1" onClick={copyImageToClipboard}>
        <i className="fas fa-copy"></i>
      </button>

    </span>
  );
}
