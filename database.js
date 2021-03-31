let mongoose = require('mongoose');
let ObjectId = require('mongoose').ObjectId;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

var Schema = mongoose.Schema;


const Panel = Schema({
  title: String,
  subtitle: String,
  body: String,
  bottomText: String,
  width: String,
  height: String,
  type: String
});

const Wall = mongoose.model("Wall", Schema({
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
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log("Connected.");
      }).catch(() => {
        console.log("Error.");
      });

    var db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  }

  /**
   * return All wall data (but not contained panels)
   */
  async getWallList() {
    return await Wall.find({}, { panels: 0 });
  }

  /**
   * TODO Need to determine the right way to get a _specific_ wall
   */
  async getWall(wallIndex, query) {
    if (!query) {
      query = {};
    }

    let wallId = new mongoose.Types.ObjectId(wallIndex);
    let wall = await Wall.find({ _id: wallId }, query);
    return wall;
  }

  async getPanel(wallIndex, panelId) {
    let wall = await this.getWall(wallIndex);

    try {
      console.log(wall[0].panels[panelId]);
      let panel = wall[0].panels[panelId];
      return panel;
    } catch (e) {
      console.log(e);
      //TODO review status codes and differentiate errors
      return { status: 404, message: "Couldn't load panel." };
    }
  }

}

module.exports = new Database()