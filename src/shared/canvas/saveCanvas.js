import { createImage } from '../../dbservices/images/createImage';

export default async function saveCanvas(mode, drawingTitle, userID) {
  const canvas = document.getElementById('canvas');
  const dataURL = canvas.toDataURL();

  await createImage({
    name: drawingTitle,
    src: dataURL,
    mode: mode,
    userID
  });
}