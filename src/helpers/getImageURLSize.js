export default function getImageURLSize (url) {
  let size
  const head = url.split(',')[0];
  size = (url.length - head.length) * 3/4 / 1024;
  size = parseFloat(size, 10);
  return size;
}