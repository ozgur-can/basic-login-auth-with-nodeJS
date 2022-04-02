const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/myapp")
    .then((db) => {
      if (mongoose.ConnectionStates.connected === db.connection.readyState) {
        // connection
        console.log("connected to db");
      }

    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectToDB;
