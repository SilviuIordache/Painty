import { useSelector } from 'react-redux';
import saveCanvas from '../../shared/canvas/saveCanvas';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export default function SaveCanvasButton(props) {
  const { currentUser } = useSelector((state) => state.auth);
  const { canvasDirty } = useSelector((state) => state.canvas);

  function saveDrawing() {
    const drawingTitle = prompt(
      'Assign a name to this image before saving it',
      'NewDrawing'
    );

    if (drawingTitle) {
      saveCanvas('practice', drawingTitle, currentUser.uid)
    }
  }

  return (
    <Button
      disabled={!canvasDirty}
      color="primary"
      onClick={saveDrawing}
      variant="contained"
      sx={{ height: '3.6rem', width: '3.6rem' }}
    >
      <SaveIcon fontSize="large" />
    </Button>
  );
}
