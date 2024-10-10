const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const ApiError = require("../utils/ApiError");

/**
 * Perform following steps:
 * -  Call the userService to create a new user
 * -  Generate auth tokens for the user
 * -  Send back
 * --- "201 Created" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": { 
 *     "_id": "6010008e6d3477697e8eamm3",
 *     "name": "users",
 *     "email": "user@gmail.com",
 *     "password": "user@X1z",optional will filter later
 *     "createdAt": "2024-10-10T15:44:14.544Z",
 *     "updatedAt": "2024-10-10T15:44:14.544Z",
 *     "__v": 0
 * }
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2024-10-10T15:29:01.745Z"
 *      }
 *  }
 *}

 */
const register = catchAsync(async (req, res) => {
  const user=await userService.createUser(req.body)
  // console.log(user)
  const tokens=await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({user,tokens})
});

/**
 * Perform the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 *{
 *  "user": { 
 *     "_id": "6010008e6d3477697e8eamm3",
 *     "name": "users",
 *     "email": "user@gmail.com",
 *     "password": "user@X1z",optional will filter later
 *     "createdAt": "2024-10-10T15:44:14.544Z",
 *     "updatedAt": "2024-10-10T15:44:14.544Z",
 *     "__v": 0
 * }
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2024-10-10T15:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const login = catchAsync(async (req, res) => {
  console.log(req.body)
  // let userdetails=await userService.getUserByEmail(req.body.email)
  // console.log(userdetails)
  let user=await authService.loginUserWithEmailAndPassword(req.body.email,req.body.password)
  if(user){
    const tokens=await tokenService.generateAuthTokens(user)
    res.status(httpStatus.OK).send({user,tokens}) 
  }else{
    new ApiError(httpStatus.UNAUTHORIZED,'invalid credentials ')
  }
});

module.exports = {
  register,
  login,
};
