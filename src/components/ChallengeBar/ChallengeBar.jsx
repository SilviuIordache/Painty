import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';

export default function ChallengeBar(props) {
  const currentWord = useSelector((state) => state.challenge.currentWord);
  const roundTotal = useSelector((state) => state.challenge.roundTotal);
  const roundCurrent = useSelector((state) => state.challenge.roundCurrent);
  const timer = useSelector((state) => state.challenge.timer);

  return (
    <Grid container spacing={1} sx={{ marginBottom: '0.5rem' }}>
      <Grid item xs={8} lg={4}>
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
            ROUND: {roundCurrent} / {roundTotal}
          </span>
          <button onClick={props.endRound} className="btn btn-warning ms-2">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ marginRight: '0.2rem' }}>
                <span>SKIP</span>
              </Box>
              <i className="fas fa-fast-forward fa-xs"></i>
            </Box>
          </button>
        </Box>
      </Grid>
      <Grid item xs={4} lg={4}>
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
            {timer}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
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
          <span className="font-weight-bold">{currentWord.toUpperCase()}</span>
        </Box>
      </Grid>
    </Grid>
  );
}
