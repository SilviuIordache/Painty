import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../redux/features/imagesSlice.js';

export default function Gallery() {
  const lastImageId = useSelector((state) => state.images.lastImageId);

  const dispatch = useDispatch();

  function getMoreImages() {
    dispatch(fetchImages({ lastImageId }));
  }

  const lastBatchLength = useSelector((state) => state.images.lastBatchLength);
  function showLoadButton() {
    return lastBatchLength === +process.env.REACT_APP_IMAGE_BATCH_SIZE;
  }

  return showLoadButton() && <button onClick={getMoreImages}>Load more</button>;
}
