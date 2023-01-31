const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

app.use('/', require('./routes'));

// app.listen(port, () => {
//     console.log(`Port is running on: ${port}`);
// })

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
  