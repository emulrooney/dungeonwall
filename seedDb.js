/**
 * Main script to seed DB with demo character. Note that this creates a wall with a specific ObjectId - if it already exists, you'll need to delete it manually.
 * This is a deliberate, temporary choice since I have a bad habit of deleting my own testing data.
 * 
 * TODO Delete wall and replace.
 * TODO End process on completion.
 * TODO Investigate mongoose-seed
 */

/* Config */

let mongoose = require('mongoose');

let env = require('dotenv').config()
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;

/* Models */

//TODO These should be in a models file
const Panel = Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    body: { type: String, required: false },
    bottomText: { type: String, required: false },
    width: { type: String, required: false },
    height: { type: String, required: false },
    type: { type: String, required: false } //"Type" reserved
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
        console.log(server);
        console.log(database);

        this._connect()
    }

    async _connect() {
        //var mongoDB = `mongodb://${username}:${password}@${server}/${database}`;
        var mongoDB = `mongodb://${server}/${database}`;
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(async () => {
                console.log("Connected.");
                await this.seedDebugPanels();
                console.log("Done seeding. Safe to kill this process!");
            }).catch(() => {
                console.log("Error.");
            });

        // var db = mongoose.connection;
        // //Bind connection to error event (to get notification of connection errors)
        // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    }


    async seedDebugPanels() {
        let newWall = new Wall({
            _id: mongoose.Types.ObjectId("605e874fee94445c5d577bd1"),
            title: "Slippers, Level 5 Monk",
            icon: "fist",
            iconColor: "blue",
            bgColor: null,
            panelOrder: [0, 1, 2, 3, 4, 5],
            panels: [
                {
                    "id": 0,
                    "title": "Unarmored Movement",
                    "subtitle": "Monk Level 1",
                    "body": "AC equals 10 + your Dexterity modifier + your Wisdom modifier.",
                    "bottomText": "PHP p76",
                    "type": "character",
                    "width": "small",
                    "height": "small"
                },
                {
                    "id": 1,
                    "title": "Martial Arts",
                    "subtitle": "Monk Level 1",
                    "body": "You gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield.\n  \n  * You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.\n  \n  * When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn.",
                    "bottomText": "PHP p76",
                    "width": "medium",
                    "height": "large",
                    "type": "character"
                },
                {
                    "id": 2,
                    "title": "Ki (Resource)",
                    "subtitle": "Monk Level 2",
                    "body": "Ki save DC = 8 + your proficiency bonus + your Wisdom modifier. ",
                    "bottomText": "PHP p76",
                    "width": "small",
                    "height": "small",
                    "type": "misc"
                },
                {
                    "id": 3,
                    "title": "Ki Powers",
                    "subtitle": "Monk Abilities",
                    "body": "\n  **Patient Defense**: Dodge as bonus action. \n  \n  **Step of the Wind**: Disengage/dash as bonus. Dbl jump speed for turn.\n  \n  **Flurry of Blows**: Two unarmed atks instead of one.\n  \n  **Stunning Strike** (lvl 5): On hit, con save vs stunned until end of my next turn.\n          ",
                    "bottomText": "PHP p76",
                    "width": "medium",
                    "height": "large",
                    "type": "character"
                },
                {
                    "id": 4,
                    "title": "Open Hand Technique",
                    "subtitle": "Open Hand Subclass",
                    "body": "\n  Whenever you hit a creature with one of the attacks granted by your **Flurry of Blows**, you can impose one of the following effects on that target.\n  \n  * It must succeed on a Dexterity saving throw or be knocked prone.\n  \n  * It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you.\n  \n  * It can't take reactions until the end of your next turn.      \n  ",
                    "bottomText": "PHP p79",
                    "width": "medium",
                    "height": "small",
                    "type": "character"
                },
                {
                    "id": 5,
                    "title": "Cloak of Displacement",
                    "subtitle": "Attuned, gift from Shannix",
                    "body": "\n  While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are **incapacitated, restrained, or otherwise unable to move.**\n  ",
                    "bottomText": "DMG p158",
                    "width": "small",
                    "height": "medium",
                    "type": "item"
                }
            ]
        });

        let result = Wall.create(newWall, function (err, success) {
            if (err) {
                //TODO Error #
                console.log(err);
                return { status: -1, message: "Couldn't add wall." };
            }
            else {
                return success;
            }
        });
        return result;
    }


}

module.exports = new Database()