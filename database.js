let mongoose = require('mongoose');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

var Schema = mongoose.Schema;


const Panel = Schema({
  _id: String,
  title: String,
  subtitle: String,
  body: String,
  bottomText: String,
  width: String,
  height: String,
  type: String
});

const Wall = mongoose.model("Wall", Schema({
  _id: String,
  title: String,
  icon: String,
  bgColor: String,
  iconColor: String,
  panels: [Panel]
}), "Walls");

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
    let result = Wall.find({}, (err) => {
      console.log("Err.");
      return err;
    }, (success) => {
      console.log("Success!");
      return success[0];
    });

    console.log(result);
    return result;
  }
}

module.exports = new Database()