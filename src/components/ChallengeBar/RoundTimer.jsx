import { Box } from '@mui/material';

export default function RoundTimer(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#fffae3',
        padding: '0.5rem',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <i className="fas fa-stopwatch me-2"></i>
        {props.timer}
      </Box>
    </Box>
  );
}
