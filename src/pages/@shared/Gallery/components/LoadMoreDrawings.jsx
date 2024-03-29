import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from 'redux/features/imagesSlice.js';

export default function Gallery() {
  const lastImageId = useSelector((state) => state.images.lastImageId);

  const imagesLoading = useSelector((state) => state.images.status);

  const dispatch = useDispatch();
  // const [batchRetrieved, setBatchRetrieved] = useState(false);

  const drawingLoader = useRef(null);
  // useEffect(() => {
  //   const onScroll = async (e) => {
  //     const element = document.querySelector('#drawing-loader');

  //     if (!element) return;
  //     const loaderY = element.getBoundingClientRect().top;

  //     // console.log(window.innerHeight, loaderY);

  //     if (loaderY - window.innerHeight < 300 && !batchRetrieved) {
  //       setBatchRetrieved(true)
  //       console.log('tick')
  //       await getMoreImages();
  //       setBatchRetrieved(false)
  //     }
  //   };
  //   window.addEventListener('scroll', onScroll);

  //   return () => window.removeEventListener('scroll', onScroll);
  // }, [batchRetrieved]);

  const lastBatchLength = useSelector((state) => state.images.lastBatchLength);
  function showLoadButton() {
    const cond1 = imagesLoading !== 'loading';
    const cond2 = lastBatchLength === +process.env.REACT_APP_IMAGE_BATCH_SIZE;
    return cond1 && cond2;
  }

  async function getMoreImages() {
    await dispatch(fetchImages({ lastImageId }));
  }

  return (
    showLoadButton() && (
      <button id="drawing-loader" ref={drawingLoader} onClick={getMoreImages}>
        Load more
      </button>
    )
  );
}
