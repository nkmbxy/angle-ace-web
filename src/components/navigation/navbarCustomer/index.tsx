'use client';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthState, authState, useSetRecoilState } from '@store/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const menuNav = [
  { name: 'HOME', path: '/home' },
  { name: 'clothing', path: '/clothing', dropdown: true },
  { name: 'about us', path: '/aboutUs' },
];

const clothingOptions = [
  { name: 'Top', path: '/top' },
  { name: 'Skirt', path: '/skirt' },
  { name: 'Pants', path: '/pants' },
  { name: 'All', path: '/allClothing' },
];
interface NavbarCustomerProps {
  token: string;
}

const NavbarCustomer: React.FC<NavbarCustomerProps> = props => {
  const { token } = props;
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElClothing, setAnchorElClothing] = React.useState<null | HTMLElement>(null);
  const [activeLink, setActiveLink] = React.useState<string>('');
  const setAuth = useSetRecoilState<AuthState>(authState);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenClothingMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElClothing(event.currentTarget);
  };

  const handleCloseClothingMenu = () => {
    setAnchorElClothing(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({ email: '', token: '' });
    router.push('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#7DD5F4' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuNav.map(item => {
              if (item.dropdown) {
                return (
                  <Grid key={item.name}>
                    <Button
                      sx={{ mr: 1, color: 'white', borderRadius: 0 }}
                      aria-controls="menu-clothing"
                      aria-haspopup="true"
                      onClick={handleOpenClothingMenu}
                    >
                      {item.name}
                    </Button>
                    <Menu
                      id="menu-clothing"
                      anchorEl={anchorElClothing}
                      keepMounted
                      open={Boolean(anchorElClothing)}
                      onClose={handleCloseClothingMenu}
                      sx={{
                        '& .MuiPaper-root': {
                          bgcolor: '#ffe99f',
                        },
                      }}
                    >
                      {clothingOptions.map(option => (
                        <Link href={option.path} key={option.name}>
                          <MenuItem onClick={handleCloseClothingMenu}>
                            <Typography textAlign="center">{option.name}</Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </Grid>
                );
              } else {
                return (
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
                );
              }
            })}
          </Box>
          {token !== '' ? (
            <Button
              sx={{
                borderRadius: 1.5,
                padding: 1,
                border: 1,
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
              }}
              onClick={handleLogout}
            >
              <Typography
                variant="h6"
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
            </Button>
          ) : (
            <Button
              sx={{
                borderRadius: 1.5,
                padding: 1,
                border: 1,
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
              }}
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarCustomer;
