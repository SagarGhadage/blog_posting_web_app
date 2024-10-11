import { Password } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import "./Register.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../utils/AuthContex";
import { signUp } from "../../api/api";
import pick from "../../utils/pick";


const Register = () => {

  const history = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const { user, } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [postResponse, setPostResponce] = useState(null);
  const [circle, setCircle] = useState(false)
  const formData = {
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password,
    confirmPassword: passwordC,
  };
  /**
   * @param {{ email: string,firstname,lastname, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {

    if (validateInput(formData)) {
      try {
        const newFormData = pick(formData, ['firstname', 'lastname', 'email', 'password'])
        setCircle(true)
        const data = await signUp(newFormData)
        console.log(data)
        if (data?.code) {
          enqueueSnackbar(data?.message, { variant: "error" });
        }
        if (data?.user) {
          enqueueSnackbar("Registered successfully", { variant: "success" });

          history('/login')
        }
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
  }

  const validateInput = (data) => {
    console.log("validating", data)
    if (data?.firstname == "") {
      enqueueSnackbar("First name is a required field", { variant: "warning" })
      return false;
    }
    if (data.lastname == "") {
      enqueueSnackbar("Last name is a required field", { variant: "warning" })
      return false;
    }
    // if (data) {
    //   console.log("email.length>6:false")
    //   enqueueSnackbar("email must be at least 6 characters", { variant: "warning" })
    //   return false;
    // }
    if (data.email == "") {
      enqueueSnackbar("Email is a required field", { variant: "warning" })
      return false;
    }
    console.log("email :true")

    console.log("username.length>6:true")
    if (data.password == "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" })
      return false;
    }
    console.log("password:true")
    if (data.password.length < 6) {
      console.log("password.length>6:false")
      enqueueSnackbar("Password must be at least 6 characters", { variant: "warning" })
      return false;
    }
    console.log("password.len>6:true")
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" })
      return false
    }
    console.log("confirmPass:true")
    return true
  };

  return (user?.isLoggedIn ? <Navigate to='/' /> :

    <Box
      display="flex"
      flexDirection="column"
      // justifyContent="space-between"
      // alignItems={'center'}
      minHeight="100vh"

    >
      {/* <Navbar/> */}
      <Box className="content" mt={0}>
        <Stack spacing={2} className="form" bgcolor={''}>
          <h2 className="title">Register</h2>
          <TextField
            id="firstname"
            label="First name"
            variant="outlined"
            title="firstname"
            name="firstname"
            placeholder="Enter firstname"
            fullWidth
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <TextField
            id="lastname"
            label="Last name"
            variant="outlined"
            title="lastname"
            name="lastname"
            placeholder="Enter Last Name"
            fullWidth
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            title="Email"
            name="email"
            placeholder="Enter Email"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e) => {
              setPasswordC(e.target.value);
              // console.log(passwordC);
            }}
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
                register(formData);
                console.log(e.target);
                // console.log(postResponse);
              }}
            >
              SignUp
            </Button>
          }

          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
          <Button
            type=""
            className="button"
            variant="contained"
            onClick={(e) => {
              console.log(e.target);
            }}
          >
            SignUp with Google
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
