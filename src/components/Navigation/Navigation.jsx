import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BrushIcon from '@mui/icons-material/Brush';
import Box from '@mui/material/Box';

export default function Navigation() {
  const { currentUser } = useSelector((state) => state.auth);

  const linkStyle = {
    color: 'white',
  };
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Link to="/" style={linkStyle}>
            <HomeIcon fontSize="large" />
          </Link>
          {currentUser && (
            <>
              <Link to="/explore" style={linkStyle}>
                <ExploreIcon fontSize="large" />
              </Link>

              <Link to="/draw/practice" style={linkStyle}>
                <BrushIcon fontSize="large" />
              </Link>

              <Link to="/profile" style={linkStyle}>
                <AccountCircleIcon fontSize="large" />
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
