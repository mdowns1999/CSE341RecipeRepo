const express = require("express");
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const { auth } = require('express-openid-connect');

const app = express();
const port = process.env.PORT || 8080;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080',
  clientID: 'uXyuYIWzBKhaWKRWLcS5qK6lMVn5UYeD',
  issuerBaseURL: 'https://dev-5sjvxvs7q7lwekt2.us.auth0.com'
};

//auth router attaches /login, /logout, and /callback routes to the baseURL
//router.use(auth(config));

app
// .use(bodyParser.urlencoded({
//   extended: false
// }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  
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
