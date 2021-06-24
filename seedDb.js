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
            panelOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            panels: [
                {
                    "_id": ObjectId("60ac16b3f494425080ccd0cf"),
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
                    "_id": ObjectId("60ac16b3f494425080ccd0d1"),
                    "id": 1,
                    "title": "Ki (Resource)",
                    "subtitle": "Monk Level 2",
                    "body": "Ki save DC = 8 + your proficiency bonus + your Wisdom modifier. ",
                    "bottomText": "PHP p76",
                    "width": "small",
                    "height": "small",
                    "type": "misc"
                },
                {
                    "_id": ObjectId("60ac16b3f494425080ccd0d2"),
                    "id": 2,
                    "title": "Ki Powers",
                    "subtitle": "Monk Abilities",
                    "body": "\n  **Patient Defense**: Dodge as bonus action. \n  \n  **Step of the Wind**: Disengage/dash as bonus. Dbl jump speed for turn.\n  \n  **Flurry of Blows**: Two unarmed atks instead of one.\n  \n  **Stunning Strike** (lvl 5): On hit, con save vs stunned until end of my next turn.\n          ",
                    "bottomText": "PHP p76",
                    "width": "medium",
                    "height": "large",
                    "type": "character"
                },
                {
                    "_id": ObjectId("60ac16b3f494425080ccd0d3"),
                    "id": 3,
                    "title": "Cloak of Displacement",
                    "subtitle": "Attuned, gift from Shannix",
                    "body": "\n  While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are **incapacitated, restrained, or otherwise unable to move.**\n  ",
                    "bottomText": "DMG p158",
                    "width": "medium",
                    "height": "small",
                    "type": "item"
                },
                {
                    "_id": ObjectId("60ac16b3f494425080ccd0d4"),
                    "id": 4,
                    "title": "Deflect Missiles",
                    "subtitle": "Monk Level 3",
                    "body": "Use reaction to deflect/catch missile when you are hit by a ranged weapon attack. Damage taken is reduced by 1d10 + your Dexterity modifier + your monk level.\n\nIf you reduce the damage to 0, you atch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack (range 20/60 feet) with the weapon or piece of ammunition you just caught, as part of the same reaction. You make this attack with proficiency, regardless of your weapon proficiencies, and the missile counts as a monk weapon for the attack.",
                    "bottomText": "PHB p76",
                    "width": "medium",
                    "height": "small",
                    "type": "character"
                },
                {
                    "_id": ObjectId("60acd901e26436426c449918"),
                    "title": "Pilgrim's Staff",
                    "subtitle": "Attuned, Magical",
                    "body": "Quarterstaff with some special powers. TODO: Copy from roll20",
                    "bottomText": "",
                    "width": "medium",
                    "height": "small",
                    "type": "item",
                    "id": 5
                },
                {
                    "_id": ObjectId("60acd930e26436426c449919"),
                    "title": "Relevant Characters",
                    "subtitle": "",
                    "body": "[Saint Helene d'Orville](https://www.worldanvil.com/w/amastris-thefridler/a/saint-helene-d-orville--person-1) - Mentor from before cold-con process, basically started the Monk class, formed Condat Abbey\n\nAranoche - Campaign villain, all sorts of bad stuff, wizard??",
                    "bottomText": "",
                    "width": "medium",
                    "height": "medium",
                    "type": "lore",
                    "id": 6
                },
                {
                    "_id": ObjectId("60acdaaae26436426c44991b"),
                    "title": "Slowfall",
                    "subtitle": "Monk Level 4",
                    "body": "Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.",
                    "bottomText": "PHB p76",
                    "width": "medium",
                    "height": "small",
                    "type": "character",
                    "id": 7
                },
                {
                    "_id": ObjectId("60acdb1be26436426c44991c"),
                    "title": "Dwarven Reach",
                    "subtitle": "Ongoing Quest",
                    "body": "Trying to reach the Dwarven Reach. Accompanied by two dwarf nobles (lvl 3 fighters) from Aotsuru clan (Crane?). Friendly, honourable.",
                    "bottomText": "",
                    "width": "medium",
                    "height": "small",
                    "type": "story",
                    "id": 8
                },
                {
                    "_id": ObjectId("60acdba6e26436426c44991d"),
                    "title": "General Useful Stuff",
                    "subtitle": "",
                    "body": "[Lore Wiki by Frid](https://www.worldanvil.com/w/amastris-thefridler)\n\nHouse Rules \n1. 6 Second rule - During combat, you have 30 seconds do decide a course of action. After 30 seconds, DM will prompt you by saying \"6 Seconds\" If you do not choose a course of action in those 6 seconds your character will do nothing for their turn. This includes (but is not limited to) spell selection, rule description, and character abilities. \n\n2. Flanking Rules are in effect but only generate a +2 on attack rolls (includes spells) Adjacency is required for flanking.\n\n3. While I am hesitate to limit planning, I would like to mitigate excessive time spent on it. Is a max 30 minutes to make a plan sufficient? \n\n4. DM is willing to hear out an argument however DM rulings are final. If you have a serious concerns or issues with a ruling, bring it up post-session (Happy to discuss) This is more for expediency's sake than lording.",
                    "bottomText": "",
                    "width": "medium",
                    "height": "small",
                    "type": "misc",
                    "id": 9
                },
                {
                    "_id": ObjectId("60acdc2de26436426c44991e"),
                    "title": "Skills and Passive Qualities",
                    "subtitle": "Monk/General",
                    "body": "**Skills**: Stealth, perception, acrobatics...\n\n**Proficiencies**: Thieve's tools\n\n**Weapon Proficiencies:** Simple, short-swords\n\n**Other**:\n* Extra Attack (regular atk = 2 normal, 1 offhand unarmed, add +1 unarmed for flurry)",
                    "bottomText": "",
                    "width": "medium",
                    "height": "small",
                    "type": "character",
                    "id": 10
                },
                {
                    "_id": ObjectId("60acdc88e26436426c44991f"),
                    "title": "Condat Abbey",
                    "subtitle": "Ongoing Quest",
                    "body": "Arrived at Condat Abbey. Surrounding town full of goblins led by hobgoblins, fought them off.\n\nFound a few survivors but only children, town ruined. ",
                    "bottomText": "Current Session",
                    "width": "medium",
                    "height": "small",
                    "type": "story",
                    "id": 11
                },
                {
                    "_id": ObjectId("60b9735456bcc45af0a4c0e4"),
                    "title": "Open Hand Bonuses",
                    "subtitle": "Monk Level 1, Open Hand",
                    "body": "Possible results from Flurry+Ki hitting a target:\n* It must succeed on a Dexterity saving throw or be knocked prone.\n* It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you.\n* It can’t take reactions until the end of your next turn.\n",
                    "bottomText": "",
                    "width": "medium",
                    "height": "small",
                    "type": "character",
                    "id": 12
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

module.exports = new Database() //new mongoose.Types.ObjectId()