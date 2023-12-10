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
import { FC, useState } from 'react';

const menuNav = [
  { name: 'HOME', path: '/' },
  { name: 'clothing', path: '/clothing', dropdown: true },
  { name: 'about us', path: '/aboutUs' },
];

const clothingOptions = [
  { name: 'Top', path: '/clothing?type=top' },
  { name: 'Skirt', path: '/clothing?type=skirt' },
  { name: 'Pants', path: '/clothing?type=pants' },
  { name: 'All', path: '/clothing' },
];
interface NavbarCustomerProps {
  token: string;
}

const NavbarCustomer: FC<NavbarCustomerProps> = props => {
  const { token } = props;
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElClothing, setAnchorElClothing] = useState<null | HTMLElement>(null);
  const [activeLink, setActiveLink] = useState<string>('');
  const setAuth = useSetRecoilState<AuthState>(authState);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenClothingMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElClothing(event.currentTarget);
  };

  const handleCloseClothingMenu = () => {
    setAnchorElClothing(null);
  };

  const handleClickClothingMenu = () => {
    setActiveLink('clothing');
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
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img
              src="/assets/images/Angel.png"
              style={{
                marginRight: '8px',
                height: '40px',
                width: 'auto',
                cursor: 'pointer',
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuNav.map(item => {
              if (item.dropdown) {
                return (
                  <Grid key={item.name}>
                    <Button
                      sx={{
                        mr: 1,
                        color: 'white',
                        borderRadius: 0,
                        ...(activeLink === item.name && {
                          borderBottomWidth: 1,
                          borderBottomStyle: 'solid',
                        }),
                      }}
                      onClick={handleOpenClothingMenu}
                    >
                      {item.name}
                    </Button>
                    <Menu
                      anchorEl={anchorElClothing}
                      open={!!anchorElClothing}
                      onClose={handleCloseClothingMenu}
                      sx={{
                        '& .MuiPaper-root': {
                          bgcolor: '#ffe99f',
                        },
                      }}
                      MenuListProps={{ disablePadding: true }}
                      disableScrollLock={true}
                    >
                      {clothingOptions.map(option => (
                        <Link href={option.path} key={option.name}>
                          <MenuItem onClick={handleClickClothingMenu}>
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
