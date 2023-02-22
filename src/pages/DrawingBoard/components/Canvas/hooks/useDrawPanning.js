import { useEffect } from 'react';

const useDrawPanning = () => {
  // prevent panning on component load; add back panning on component destroy
  useEffect(() => {
    const html = document.documentElement;
    html.style.touchAction = 'none';

    return function cleanup() {
      html.style.touchAction = 'auto';
    };
  }, []);
};

export default useDrawPanning;
