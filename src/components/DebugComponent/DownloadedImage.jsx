import { useState, useEffect } from 'react';
import downloadImage from '../../helpers/downloadImage';

export default function DownloadedImage() {

  const [url, setUrl] = useState();
  useEffect(() => {
    if (!url) {
      getImage();
    }
  }, [url]);
  
  async function getImage() {
    const res = await downloadImage();
    setUrl(res)
  }

  const name = '123';

  return (
    <img
      alt={name}
      src={url}
      key="123"
      width="200px"
    />
  );
}
