import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import * as React from 'react';

const menuNav = [
  { name: 'สรุปยอดขาย', path: '/summary' },
  { name: 'คลังสินค้า', path: '/stock' },
  { name: 'สั่งของเพิ่ม', path: '/addStock' },
  { name: 'ลงทะเบียนสินค้าใหม่', path: '/registerProduct' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [activeLink, setActiveLink] = React.useState<string>('');

  console.log(activeLink);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Angle Ace
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
              {menuNav.map(item => (
                <Link onClick={() => setActiveLink(item.name)} href={item.path} key={item.name}>
                  <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuNav.map(item => (
              <Link
                onClick={() => {
                  handleCloseNavMenu();
                  setActiveLink(item.name);
                }}
                href={item.path}
                key={item.name}
              >
                <Button
                  sx={{
                    mr: 1,
                    color: 'white',
                    borderRadius: 0,
                    '&:hover': {
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                    },
                    ...(activeLink === item.name && {
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                    }),
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              borderRadius: 1.5,
              padding: 1,
              border: 1,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
