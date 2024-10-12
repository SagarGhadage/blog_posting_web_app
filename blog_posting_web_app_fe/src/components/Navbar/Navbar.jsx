import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../../Themes/Contexts';
import { Avatar, Container, Menu, MenuItem, Tooltip, useMediaQuery } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../../utils/AuthContex';
import AdbIcon from '@mui/icons-material/Adb';
import ArticleIcon from '@mui/icons-material/Article';
export default function Navbar({ }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const screenSize = useMediaQuery('(max-width:768px)')
  const { mode, setMode } = useContext(ThemeContext)
  const { user, logout } = useContext(AuthContext)
  const history = useNavigate()
  console.log(user)
  return (
    <Box sx={{ flexGrow: 0, background: '' }} position={'sticky'}>
      <AppBar position="static" sx={{ background: 'transperent', backgroundColor: 'primary.bgdark', boxShadow: 'none' }}>
        <Container maxWidth="xl">

          <Toolbar disableGutters>
            <ArticleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={(e) => {
                history('/')
              }}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BLOG
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
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {/* {pages.map((page) => ( */}
                <MenuItem onClick={() => { history('/create') }}>
                  <Typography sx={{ textAlign: 'center' }}>Create Blog</Typography>
                </MenuItem>
                <MenuItem onClick={() => { history('/myblogs') }}>
                  <Typography sx={{ textAlign: 'center' }}>My Blogs</Typography>
                </MenuItem>
                <MenuItem onClick={() => { history('/logout') }}>
                  <Typography sx={{ textAlign: 'center' }}>Log Out</Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
            <ArticleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={(e) => {
                history('/')
              }}
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
              BLOG
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => { history('/Create') }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Create Blog
              </Button>

              {user?.isLoggedIn &&
                <Button
                  onClick={() => { history('/myblogs') }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  My Blog
                </Button>}
            </Box>

            {/* Login SignUp Logout Btn */}
            <Typography variant="span" fontSize={14} lineHeight={1} component="h3" sx={{ display: '-webkit-inline-flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', color: 'primary' }}>

              {!user?.isLoggedIn && <IconButton onClick={() => { }}>
                <Button
                  type="button"
                  // className="button"
                  variant="contained"
                  onClick={(e) => {
                    history('/login')
                  }}
                >
                  LOGIN
                </Button>
              </IconButton>}

              {!user?.isLoggedIn && <IconButton onClick={() => { }}>
                <Button
                  type="button"
                  // className="button"
                  sx={{ backgroundColor: 'primary.bglight', color: 'primary.btn', fontWeight: 'bold' }}
                  variant="contained"
                  onClick={(e) => {
                    history('/register')
                  }}
                >
                  SIGNUP
                </Button>
              </IconButton>}
              {user?.isLoggedIn && <IconButton onClick={() => { }}>
                <Button
                  type="button"
                  // className="button"
                  sx={{ backgroundColor: 'primary.delete' }}
                  variant="contained"
                  onClick={(e) => { logout(); history('/') }}
                >
                  LOGOUT
                </Button>
              </IconButton>}
            </Typography>

            {/* Theme Btn */}

            <IconButton onClick={() => { setMode((prev) => prev === 'dark' ? "light" : 'dark') }}>
              {mode === 'dark' ? <Brightness4 fontSize='large' /> : <Brightness7 color='white' fontSize='large' />}
            </IconButton>

            {/* User Profile */}
            <Box sx={{ flexGrow: 0 }}>
              {user?.isLoggedIn && <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${user?.user?.firstname}`.toUpperCase()} src="/static/images/avatar/99.jpg" />
                </IconButton>
              </Tooltip>}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>User Profile</Typography>
                </MenuItem>
                <MenuItem onClick={()=>logout()}>
                  <Typography sx={{ textAlign: 'center' }}>Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
