import { Box } from '@mui/material';

export default function CurrentRound(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fffae3',
        padding: '0.5rem',
      }}
    >
      <span>
        ROUND: {props.roundCurrent} / {props.roundTotal}
      </span>
      <button onClick={props.roundEndLogic} className="btn btn-warning ms-2">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '0.2rem' }}>
            <span>NEXT</span>
          </Box>
          <i className="fas fa-fast-forward fa-xs"></i>
        </Box>
      </button>
    </Box>
  );
}
