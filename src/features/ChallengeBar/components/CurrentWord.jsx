import { Box } from '@mui/material';

export default function RoundTimer(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fffae3',
        padding: '0.5rem',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <span className="text-muted">Draw this: </span>
      <span className="font-weight-bold">
        {props.currentWord.toUpperCase()}
      </span>
    </Box>
  );
}
