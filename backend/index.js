require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const PORT=process.env.PORT

//Create Mongo connection and get the express app to listen on config.port will replace while deploying
const DB_URI = 'mongodb://127.0.0.1:27017/blogs'
mongoose.connect(config.mongoose.url,config.mongoose.options)
    .then(() => console.log("Connected to DB at", DB_URI))
    .catch((e) => console.log("Failed to connect to DB\n", e))


app.listen(PORT,()=>{
  console.log("Server Listening at", PORT);
})
