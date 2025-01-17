import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Link from 'next/link';
import { cloneElement, useState } from 'react';

import AppLogo from '../app/AppLogo';

const pages = [
  { name: 'Ajouter des traduction', href: '/translation/' },
  { name: 'Valider des traductions', href: '/translation/validate/' },
];

export default function HeaderAppBar() {
  return (
    <ElevationScroll>
      <AppBar position='sticky'>
        <Container>
          <Toolbar disableGutters className='flex justify-between'>
            <AppLogo
              borderBase
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            />
            <LeftNavLinks />
            <AppLogo sx={{ display: { xs: 'flex', md: 'none' } }} />
            <RightNavLinks />
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

function LeftNavLinks() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='Navbar menu'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
          keepMounted
        >
          {pages.map(({ name, href }) => (
            <Link href={href} key={name}>
              <a className='link-underlined flex'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>{name}</Typography>
                </MenuItem>
              </a>
            </Link>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map(({ name, href }) => (
          <Link href={href} key={name}>
            <a className='link-underlined flex'>
              <Button
                key={name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                {name}
              </Button>
            </a>
          </Link>
        ))}
      </Box>
    </>
  );
}

function RightNavLinks() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Link href='/about'>
        <a className='link-underlined flex'>
          <Button sx={{ my: 0, color: 'white', display: 'block' }}>
            À propos
          </Button>
        </a>
      </Link>
    </Box>
  );
}

export function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: undefined,
  });
  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
