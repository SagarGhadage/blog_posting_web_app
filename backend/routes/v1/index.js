const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const blogsRoute = require("./blogs.route");


const router = express.Router();


router.use("/users",userRoute)
router.use("/auth",authRoute)
router.use('/blogs',blogsRoute)
module.exports = router;
