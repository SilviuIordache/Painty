import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BrushIcon from '@mui/icons-material/Brush';
import Box from '@mui/material/Box';

export default function Navigation() {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  function getActiveLinkStyle(path) {
    const linkStyle = {
      color: location.pathname === path ? 'white' : '#21416b',
    };
    return linkStyle;
  }

  return (
    <AppBar position="fixed" color="primary">
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Toolbar sx={{ maxWidth: '60rem', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Link to="/" style={getActiveLinkStyle('/')}>
              <HomeIcon fontSize="large" />
            </Link>
            {currentUser && (
              <>
                <Link to="/explore" style={getActiveLinkStyle('/explore')}>
                  <ExploreIcon fontSize="large" />
                </Link>

                <Link
                  to="/draw/practice"
                  style={getActiveLinkStyle('/draw/practice')}
                >
                  <BrushIcon fontSize="large" />
                </Link>

                <Link to="/profile" style={getActiveLinkStyle('/profile')}>
                  <AccountCircleIcon fontSize="large" />
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
