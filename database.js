let mongoose = require('mongoose');
let ObjectId = require('mongoose').ObjectId;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;

//TODO These should be in a models file
const Panel = Schema({
  title: String,
  subtitle: String,
  body: String,
  bottomText: String,
  width: String,
  height: String,
  panelType: String //"Type" reserved
});

const Wall = mongoose.model("Wall", Schema({
  title: { type: String, required: true },
  icon: { type: String, required: false },
  bgColor: { type: String, required: false },
  iconColor: { type: String, required: false },
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
   * 
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
      let panel = wall[0].panels[panelId];
      return panel;
    } catch (e) {
      //TODO review status codes and differentiate errors
      return { status: 404, message: "Couldn't load panel." };
    }
  }

  async createWall(wallData) {
    let newWall = new Wall({
      _id: mongoose.Types.ObjectId(),
      title: wallData.title,
      icon: wallData.icon,
      iconColor: wallData.iconColor,
      bgColor: wallData.bgColor,
      panels: []
    });

    Wall.create(newWall, function (err, success) {
      if (err) {
        //TODO Error #
        console.log(err);
        return { status: -1, message: "Couldn't add wall." };
      }
      else {
        return success;
      }
    });
  }

  async createPanel(wallIndex, panelData) {
    let wallId = new mongoose.Types.ObjectId(wallIndex);

    let result = Wall.findOneAndUpdate(
      { _id: wallId },
      { $push: { "panels": panelData } },
      { new: true },
      function (err, success) {
        if (err)
          return err;
        else
          return success;
      }
    );

    return result;
  }
}

module.exports = new Database()