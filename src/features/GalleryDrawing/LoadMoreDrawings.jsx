import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../redux/features/imagesSlice.js';

export default function Gallery() {
  const lastImageId = useSelector((state) => state.images.lastImageId);

  const dispatch = useDispatch();
  const [batchRetrieved, setBatchRetrieved] = useState(false);

  async function getMoreImages() {
    await dispatch(fetchImages({ lastImageId }));
  }

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
    return lastBatchLength === +process.env.REACT_APP_IMAGE_BATCH_SIZE;
    // return true;
  }

  return (
    showLoadButton() && (
      <button id="drawing-loader" ref={drawingLoader} onClick={getMoreImages}>
        Load more
      </button>
    )
  );
}
