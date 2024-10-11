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
import { useMediaQuery } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../../utils/AuthContex';

export default function Navbar({ }) {
  const screenSize = useMediaQuery('(max-width:768px)')
  const { mode, setMode } = useContext(ThemeContext)
  const { user, logout } = useContext(AuthContext)
  const history = useNavigate()
  console.log(user)
  return (
    <Box sx={{ flexGrow: 0, background: '' }} position={'sticky'}>
      <AppBar position="static" sx={{ background: 'transperent', backgroundColor: 'primary.bgdark', boxShadow: 'none' }}>
        <Toolbar>

          <Typography variant="h1" component="h1" sx={{ flexGrow: 0, color: 'text.dark' }} onClick={(e) => {
            history('/')
          }}>
            <EventNoteIcon color='primary.bglight' />
          </Typography>
          <Typography alignSelf={'auto'} justifySelf={'flex-start'} variant="h1" component="h1" sx={{ flexGrow: 1, color: 'text.dark' }} >
            {<IconButton onClick={() => { 
                  history('/create')
            }}>
              <Button
                type="button"
                // className="button"
                variant="contained"
                onClick={(e) => {
                }}
              >
                Create Blog
              </Button>
            </IconButton>}
          </Typography>
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
                onClick={(e) => { logout() }}
              >
                LOGOUT
              </Button>
            </IconButton>}
          </Typography>

          <IconButton onClick={() => { setMode((prev) => prev === 'dark' ? "light" : 'dark') }}>
            {mode === 'dark' ? <Brightness4 fontSize='large' /> : <Brightness7 color='white' fontSize='large' />}
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
