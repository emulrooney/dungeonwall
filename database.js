let mongoose = require('mongoose');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

var Schema = mongoose.Schema;

//Schemas
const Panel = mongoose.model("Panel", Schema({
  _id: String,
  title: String,
  subtitle: String,
  body: String,
  bottomText: String,
  width: String,
  height: String,
  type: String
}), "Panels"); //Last bit is the debugCollection name - later we'll specify the actual table.

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    //var mongoDB = `mongodb://${username}:${password}@${server}/${database}`;
    var mongoDB = `mongodb://${server}/${database}`;
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Connected.");
      }).catch(() => {
        console.log("Error.");
      });

    var db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  }

  async getDebugContent() {
    let result = Panel.find({}, (err) => {
      console.log("Err.");
      return err;
    }, (success) => {
      console.log("Success!");
      return success;
    });

    console.log(result);
    return result;
  }
}

module.exports = new Database()