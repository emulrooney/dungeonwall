/* Config */

let mongoose = require('mongoose');
let ObjectId = require('mongoose').ObjectId;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;


/* Models */

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
  panelOrder: { type: [Number], required: true },
  panels: [Panel]
}), "Walls");


/* DB Class */

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
   * Return a list of all wall configs (without. panels!)
   * @return {Array} walls in a list
   */
  async getWallList() {
    return await Wall.find({}, { panels: 0 });
  }

  /**
   * Get a single wall (including panels) with optional query.
   * @param {String} wallIndex  
   * @param {Object} query 
   */
  async getWall(wallIndex, query) {
    if (!query) {
      query = {};
    }

    let wallId = new mongoose.Types.ObjectId(wallIndex);
    let wall = await Wall.find({ _id: wallId }, query);
    return wall;
  }

  /**
   * Get a single panel from given wall.
   * 
   * @param {String} wallIndex 
   * @param {Integer} panelId
   * @return {Panel} panel content 
   */
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

  /**
   * Generate a new wall based on passed in data.
   * 
   * @param {Object} wallData Wall data to populate Wall document 
   */
  async createWall(wallData) {
    let newWall = new Wall({
      _id: mongoose.Types.ObjectId(),
      title: wallData.title,
      icon: wallData.icon,
      iconColor: wallData.iconColor,
      bgColor: wallData.bgColor,
      panels: [],
      panelOrder: []
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

  /**
   * Generate a new panel based on based in data and append to specified wall.
   * 
   * @param {String} wallIndex 
   * @param {Object} panelData Object with data to populate a new panel
   */
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

  async updateWall(wallIndex, wallUpdateData) {
    let wallId = mongoose.Types.ObjectId(wallIndex);

    let updatedWall = {};
    Object.keys(wallUpdateData).forEach((key) => {
      //TODO Validation.
      updatedWall[key] = wallUpdateData[key];
    });

    let wall = await Wall.findByIdAndUpdate(wallId, updatedWall, {}, (err, result) => {
      if (err) {
        console.log("Error updating: ");
        console.log(updatedWall);
        return err;
      } else {
        return result;
      }
    });

    return wall;
  };

  async updatePanel(wallIndex, panelIndex, panelUpdateData) {
    let wallId = mongoose.Types.ObjectId(wallIndex);

    let updatedPanel = {};
    Object.keys(panelUpdateData).forEach((key) => {
      //TODO Validation.
      updatedPanel[key] = panelUpdateData[key];
    });

    let updatedWall = { "panels.id": panelIndex };
    updatedWall["panels"] = [updatedPanel];

    return this.updateWall(wallIndex, updatedWall);
  }

  //todo 
  async deletePanel() {
    return false;
  }

  async deleteWall(wallIndex) {
    let wallId = mongoose.Types.ObjectId(wallIndex);
    let deletedWall = Wall.deleteOne({ "_id": wallId });
    return deletedWall;
  }
}

module.exports = new Database()