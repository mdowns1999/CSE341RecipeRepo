const express = require("express");
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const { auth } = require('express-openid-connect');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL
};

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:8080',
//   clientID: 'JmUWkgrcY0TEvCDklM6Cav6eHEodq4JU',
//   issuerBaseURL: 'https://dev-5sjvxvs7q7lwekt2.us.auth0.com'
// };

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  
  //auth router attaches /login, /logout, and /callback routes to the baseURL
  .use(auth(config))
  .use("/", require("./routes"));

mongodb.initDb((err, mongodb, next) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
