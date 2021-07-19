const mongoose = require("mongoose");
const connnectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log("Databse Connected with the host " + con.connection.host);
    });
};

module.exports = connnectDatabase;
