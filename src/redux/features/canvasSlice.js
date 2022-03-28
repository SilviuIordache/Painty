import { createSlice } from '@reduxjs/toolkit'


const initialState = {}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    // saveCanvas(drawingTitle) {
    //   const canvas = document.getElementById("canvas");

    // let imageName;
    // if (!drawingTitle) {
    //   imageName = prompt(
    //     "Assign a name to this image before saving it",
    //     "NewDrawing"
    //   );
    //   if (!imageName) return;
    // } else {
    //   imageName = drawingTitle;
    // }

    // const dataURL = canvas.toDataURL();

    // // check for stored images
    // const galleryImages = JSON.parse(localStorage.getItem("paintyImages"));

    // const imgID =
    //   galleryImages?.length > 0
    //     ? galleryImages[galleryImages.length - 1].id + 1
    //     : 0;

    // // build image object
    // const imgObject = {
    //   id: imgID,
    //   src: dataURL,
    //   name: imageName,
    //   mode: gameMode,
    //   date: new Date().toISOString(),
    // };

    // if (galleryImages) {
    //   // add to array and store it back
    //   galleryImages.push(imgObject);
    //   localStorage.setItem("paintyImages", JSON.stringify(galleryImages));
    // } else {
    //   // create an array
    //   let arr = [];
    //   arr.push(imgObject);
    //   localStorage.setItem("paintyImages", JSON.stringify(arr));
    // }
    // if (gameMode === 'practice') {
    //   setSavedFeedback(true);
    // }
    // }
  }
})

export const {} = canvasSlice.actions;
export default canvasSlice.reducer;