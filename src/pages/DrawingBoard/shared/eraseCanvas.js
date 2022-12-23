export default function eraseCanvas() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
}