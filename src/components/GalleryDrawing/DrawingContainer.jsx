import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function DrawingContainer(props) {
  const { downloadImage } = useAuth();
  const [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    let imageRetrieved = false;
    const fetchData = async () => {
      const data = await downloadImage(props.path);
      if (!imageRetrieved) {
        setImageSrc(data);
      }
    };
    fetchData().catch((err) => {});
    return () => (imageRetrieved = false);
  });

  return <img src={imageSrc} alt={props.name} key={props.index} width="100%" />;
}
