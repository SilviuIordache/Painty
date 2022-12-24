import BrushSizeButton from './BrushSizeButton';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export default function BrushSizeSelector() {
  const sizes = require('data/brushSizes.json').sizes;
  const currentBrushSize = useSelector((state) => state.tool.size);

  const brushSizes = sizes.map((size, index) => {
    return (
      <BrushSizeButton
        active={size === currentBrushSize}
        key={index}
        size={size}
      />
    );
  });

  return <Box sx={{ display: 'flex' }}>{brushSizes}</Box>;
}
