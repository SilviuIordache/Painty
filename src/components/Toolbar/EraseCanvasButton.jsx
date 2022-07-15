import eraseCanvas from '../../shared/canvas/eraseCanvas';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';

export default function EraseCanvasButton() {
  function eraseCanvasPre() {
    const confirmErase = window.confirm('Erase current canvas?');
    if (confirmErase) {
      eraseCanvas();
    }
  }

  return (
    <Button
      color="error"
      onClick={eraseCanvasPre}
      variant="contained"
      sx={{ height: '3.6rem', width: '3.6rem' }}
    >
      <DeleteOutlineIcon fontSize="large" />
    </Button>
  );
}
