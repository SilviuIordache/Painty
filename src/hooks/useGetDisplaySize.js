import { useEffect, useState } from 'react';

const useGetDisplaySize = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return {
    height,
    width,
  };
};

export default useGetDisplaySize;
