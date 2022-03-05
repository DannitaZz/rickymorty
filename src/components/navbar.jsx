import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { CardMedia } from '@mui/material';
import rick from '../img/rick.png';
import { useNavigate } from 'react-router';
import { useConsumer } from '../context/context';

const pages = ['Láminas', 'Mi álbum', 'Info'];

function Timer() {
  const [state, dispatch] = useConsumer();

  React.useEffect(() => {
    const timerVal = state.packPage.timerVal
    const timer = timerVal > 0 && setInterval(() => dispatch({ 'type': 'setTimer', 'value': timerVal - 1 }), 10000);
    return () => clearInterval(timer);
  }, [state.packPage.timerVal]);

  return (
    <div>Countdown: {state.packPage.timerVal}</div>
  );
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigateTo = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);

  };
  const handleOpenUserMenu = () => {
    console.log('cerrar sesión');
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    navigateToView(e);
  };

  const navigateToView = (e) => {
    const value = Number(e.currentTarget.value);
    if (value === 0) {
      navigateTo('sheets');
    } else if (value === 1) {
      navigateTo('/')
    } else if (value === 2) {
      navigateTo('info')
    }
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, marginRight: 1 }}>
            <CardMedia
              component='img'
              height="35"
              image={rick}
              alt="rick"
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Rick and Morty
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page} value={i} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Rick and Morty
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={page}
                value={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Timer />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <ExitToAppIcon onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              </ExitToAppIcon>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;