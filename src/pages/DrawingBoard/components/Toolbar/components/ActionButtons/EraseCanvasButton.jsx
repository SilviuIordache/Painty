import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import eraseCanvas from '../../../../../../shared/canvas/eraseCanvas';
import { setCanvasDirty } from "../../../../../../redux/features/canvasSlice"

export default function EraseCanvasButton() {
  const dispatch = useDispatch();

  function eraseCanvasPre() {
    const confirmErase = window.confirm('Erase current canvas?');
    if (confirmErase) {
      eraseCanvas();
      dispatch(setCanvasDirty(false));
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
