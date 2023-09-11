const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
//https://bobbyhadz.com/blog/javascript-typeerror-callback-is-not-a-function
let _db;


const initDb = (callback = () => {}) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
    //return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// const closeDB = async () => {
//   await _db.close();
// }

// const initDb = async () => {
//   // Connect to MongoDB URI
//   await mongoose
//     .connect(process.env.MONGODB_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     })
//     .then(() => {
//       _db = mongoose.connection;
//       console.log(`Connected to DB`);

//     })
//     .catch((err) => {
//       throw err;
//     });
// };

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
  _db
};
