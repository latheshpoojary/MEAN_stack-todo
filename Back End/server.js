var express = require("express");
var server = express();
var routes = require("./routes/routes");


var mongoose = require("mongoose");
var cors = require("cors");

mongoose
  .connect("mongodb://0.0.0.0:27017/task-track", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db is connected successfully");
  })
  .catch((error) => {
    console.log("something went wrong", error);
  });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000, function checkPort(error) {
  if (error) {
    console.log("something went wrong");
  } else {
    console.log("port successfully running");
  }
});
