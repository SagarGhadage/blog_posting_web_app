import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from './Themes/Contexts';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from '@mui/material'
import { getPallete } from './Themes/Pallate';
import React, { useEffect, useMemo, useState } from "react";
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './utils/AuthContex';
import { fetchLocation } from './api/api';



function App() {
  const [userLocation,setUserLocation]=useState({})
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const theme = useMemo(() => createTheme(getPallete(mode)), [mode]);
  const [user, setLoggedUser] = useState({user:JSON.parse(localStorage.getItem('user')),isLoggedIn:localStorage.getItem('isLoggedIn')}||{isLoggedIn:false,user:{}});
  const logout=()=>{
    localStorage.clear()
    setLoggedUser({isLoggedIn:false,user:{}})
  }
  useEffect(()=>{
    const getLocation= async () => {
      let location = await fetchLocation();
      console.log(location)
      setUserLocation(location)
    }
    getLocation()
  },[])
  return (
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
    <AuthContext.Provider value={{user,logout,setLoggedUser:function(user,isLoggedIn){setLoggedUser({user,isLoggedIn})}}}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Outlet context={{userLocation}}></Outlet>
      </ThemeProvider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
