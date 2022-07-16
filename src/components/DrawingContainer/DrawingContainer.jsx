import { useEffect, useState } from 'react';
import { getImageFile } from '../../dbservices/images/getImageFile.js';

export default function DrawingContainer(props) {
  const [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    let imageRetrieved = false;
    const fetchData = async () => {
      const data = await getImageFile(props.path);
      if (!imageRetrieved) {
        setImageSrc(data);
      }
    };
    fetchData().catch((err) => {});
    return () => {
      imageRetrieved = false;
      setImageSrc()
    }
  }, [props.path]);

  return (
    <img
      id={props.id}
      src={imageSrc}
      alt={props.name}
      key={props.index}
      width="100%"
    />
  );
}
