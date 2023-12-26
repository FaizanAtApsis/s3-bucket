const express = require("express");
const colors = require("colors");
const path = require("path");
const cors = require("cors");
const { Error500 } = require("./middleware/Errors");
const { sequelize } = require("./models");
// const { sequelize } = require("./models");
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(Error500);

app.use('/login',require('./routes/authRoutes'))
app.use('/user',require('./routes/userRoutes'))
app.use('/bucket',require('./routes/bucketRoutes'))
app.use('/file',require('./routes/fileRoutes'))
// router.route("/login").post(verifyUser, loginUser);
app.listen(process.env.PORT, async () => {
    console.log(
      `Server up on http://${require("ip").address()}:${process.env.PORT}`.cyan
        .inverse
    );
    try {
      await sequelize.authenticate({ loging: false });
      console.log("Database Connected...".green.inverse.bold);
    } catch (error) {
      console.log(error);
    }
  });