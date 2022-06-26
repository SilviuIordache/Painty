import BrushSizeSelector from '../BrushSizeSelector/BrushSizeSelector';
import ColorSelector from '../ColorSelector/ColorSelector';
import ColorPreview from '../ColorPreview/ColorPreview';
import ToolSelector from '../ToolSelector/ToolSelector';
import { Grid, Box } from '@mui/material';

export default function Toolbar(props) {
  return (
    <Grid container sx={{ backgroundColor: 'lightgray', padding: '1rem 1rem' }}>
      <Grid item xs={12} md={4} xl={4} sx={{marginBottom: '0.5rem'}}>
        <Box sx={{ display: 'flex' }}>
          <ColorPreview />
          <Box sx={{ marginLeft: '0.5rem' }}>
            <ColorSelector />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} xl={3} sx={{marginBottom: '0.5rem'}}>
        <ToolSelector />
      </Grid>
      <Grid item xs={12} md={4} xl={3} sx={{marginBottom: '0.5rem'}}>
        <BrushSizeSelector />
      </Grid>
      <Grid item xs={12} md={4} xl={2}>
        <EraseCanvasButton
          eraseCanvas={() => {
            props.eraseCanvas(true);
          }}
        />
        {props.gameMode === 'practice' && (
          <SaveCanvasButton
            saveCanvas={() => {
              props.saveCanvas();
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

const actionButtonStyle = {
  width: '3.6rem',
  height: '3.6rem',
  fontSize: '1.3rem',
};
function EraseCanvasButton(props) {
  return (
    <button
      style={actionButtonStyle}
      className="btn btn-danger px-3 me-1 "
      onClick={props.eraseCanvas}
    >
      <i className="far fa-trash-alt"></i>
    </button>
  );
}

function SaveCanvasButton(props) {
  return (
    <button
      style={actionButtonStyle}
      className="btn btn-primary px-3"
      onClick={props.saveCanvas}
    >
      <i className="far fa-save"></i>
    </button>
  );
}
