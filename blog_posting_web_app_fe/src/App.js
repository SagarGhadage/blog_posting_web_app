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
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



function App() {
  const [userLocation, setUserLocation] = useState({})
  const [blogToEdit, setBlogToEdit] = useState(0)
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const theme = useMemo(() => createTheme(getPallete(mode)), [mode]);
  const [user, setLoggedUser] = useState({ user: JSON.parse(localStorage.getItem('user')), isLoggedIn: localStorage.getItem('isLoggedIn') } || { isLoggedIn: false, user: {} });
  //payPal
  const initialOptions = {
    "client-id": "AROg6J_ulIjwAyzJG5Ol7-I28zPluFfLx1oMIHF_c9qoVm5EZVrsDd3mdk0_OXJAFBbuH7Rjm9m08QgP",
    currency: "USD",
    intent: "capture",
  };
  //logout fun
  const logout = () => {
    localStorage.clear()
    setLoggedUser({ isLoggedIn: false, user: {} })
  }

  useEffect(() => {
    const getLocation = async () => {
      let location = await fetchLocation();
      console.log(location)
      setUserLocation(location)
    }
    getLocation()
  }, [])
  return (
    <PayPalScriptProvider options={initialOptions}>
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <AuthContext.Provider value={{ user, logout, setLoggedUser: function (user, isLoggedIn) { setLoggedUser({ user, isLoggedIn }) }, setBlogToEdit, blogToEdit }}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Outlet context={{ userLocation, }}></Outlet>
        </ThemeProvider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
    </PayPalScriptProvider>
  );
}

export default App;
