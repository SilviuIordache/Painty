import BrushSizeSelector from './components/BrushSelector/BrushSizeSelector';
import ColorSelector from './components/ColorSelector/ColorSelector';
import ColorPreview from './components/ColorPreview/ColorPreview';
import ToolSelector from './components/ToolSelector/ToolSelector';
import { Grid, Box } from '@mui/material';

import SaveCanvasButton from './components/ActionButtons/SaveCanvasButton';
import EraseCanvasButton from './components/ActionButtons/EraseCanvasButton';

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
      <Grid item xs={12} md={4} lg={3} sx={{marginBottom: '0.5rem'}}>
        <ToolSelector />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sx={{marginBottom: '0.5rem'}}>
        <BrushSizeSelector />
      </Grid>
      <Grid item xs={12} md={4} lg={2} sx={{ display: 'flex', justifyContent: 'end'}}>
        <EraseCanvasButton/>
        
        {props.gameMode === 'practice' && (
          <Box sx={{ marginLeft: '0.2rem'}}>
            <SaveCanvasButton/>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
