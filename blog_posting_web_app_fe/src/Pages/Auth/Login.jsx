import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../utils/AuthContex";
import { login } from "../../api/api";


const Login = () => {
  const {user,setLoggedUser}=useContext(AuthContext)
  useEffect(()=>{
    
  },[])
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate()
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const [circle, setCircle] = useState(false)

  const handleLoginForm = e => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "user": "user",
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const handleLogin = async (formData) => {
    if (validateInput(formData)) {
      try {
        setCircle(true)
        const response = await login({ email: formData.username, password: formData.password })
        
        enqueueSnackbar("Logged In successfully", { variant: "success" });
        console.log(response.user)

        persistLogin(response?.tokens, response?.user)
        setLoggedUser(localStorage.getItem('user'),localStorage.getItem('isLoggedIn'))
        history('/')
      } catch (err) {
        console.log(err);

        if (err.response && err.response.data) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        else {
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: "error" });
        }

      } finally {
        setCircle(false)
      }
    };
  };

  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   * @returns {boolean}
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if (data.username == "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" })
      return false;
    }
    if (data.password == "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" })
      return false;
    }
    return true
  };

  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} user
   *    Username of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (tokens, user) => {
    localStorage.setItem('token', tokens?.access?.token)
    localStorage.setItem('email', user?.email)
    localStorage.setItem('id',user?._id )
    localStorage.setItem('isLoggedIn',true)
    localStorage.setItem('user',JSON.stringify(user)||{})
  };

  return (user?.isLoggedIn?<Navigate to='/'></Navigate>:
    <Box
      display="flex"
      flexDirection="column"
      // justifyContent="space-between"
      // alignItems={''}
      minHeight="100vh"
    >
      {/* <Navbar/> */}
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={loginForm.username}
            onChange={
              handleLoginForm
            }
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={loginForm.password}
            onChange={
              handleLoginForm
            }
          />
          {circle ?
            <Box textAlign="center">
              <CircularProgress />
            </Box>
            :
            <Button
              type="submit"
              className="button"
              variant="contained"
              onClick={(e) => {
                // e.preventDefault()
                handleLogin(loginForm)
                console.log(e.target);
              }}
            >
              LOGIN 
            </Button>
          }

          <p className="secondary-action">
            Don’t have an account?{" "}
            <Link className="link" to="/register">
              SignUp now
            </Link>
          </p>
          <Button
              type=""
              className="button"
              variant="contained"
              onClick={(e) => {
                // login(loginForm)
                console.log(e.target);
              }}
            >
              Login with Google
            </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
