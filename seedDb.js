let mongoose = require('mongoose');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

var Schema = mongoose.Schema;

const Panel = mongoose.model("Panel", Schema({
    _id: String,
    title: String,
    subtitle: String,
    body: String,
    bottomText: String,
    width: String,
    height: String,
    type: String
}), "panels"); //Last bit is the debugCollection name - later we'll specify the actual table.

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
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

    async seedDebugPanels() {
        Panel.insertMany([
            {
                id: 0,
                title: "Unarmored Movement",
                subtitle: "Monk Level 1",
                body: "AC equals 10 + your Dexterity modifier + your Wisdom modifier.",
                bottomText: "PHP p76",

                type: "class",
                width: "small",
                height: "small"
            },
            {
                id: 1,
                title: "Martial Arts",
                subtitle: "Monk Level 1",
                body:
                    `You gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield.
  
  * You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.
  
  * When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn.`,
                bottomText: "PHP p76",

                width: "medium",
                height: "large",
                type: "class"
            },
            {
                id: 2,
                title: "Ki (Resource)",
                subtitle: "Monk Level 2",
                body: "Ki save DC = 8 + your proficiency bonus + your Wisdom modifier. ",
                bottomText: "PHP p76",

                currentUses: 5,
                maxUses: 5,

                width: "small",
                height: "small",
                type: "misc"
            },
            {
                id: 3,
                title: "Ki Powers",
                subtitle: "Monk Abilities",
                body: `
  **Patient Defense**: Dodge as bonus action. 
  
  **Step of the Wind**: Disengage/dash as bonus. Dbl jump speed for turn.
  
  **Flurry of Blows**: Two unarmed atks instead of one.
  
  **Stunning Strike** (lvl 5): On hit, con save vs stunned until end of my next turn.
          `,
                bottomText: "PHP p76",

                width: "medium",
                height: "large",
                type: "class"
            },
            {
                id: 4,
                title: "Open Hand Technique",
                subtitle: "Open Hand Subclass",
                body: `
  Whenever you hit a creature with one of the attacks granted by your **Flurry of Blows**, you can impose one of the following effects on that target.
  
  * It must succeed on a Dexterity saving throw or be knocked prone.
  
  * It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you.
  
  * It can't take reactions until the end of your next turn.      
  `,
                bottomText: "PHP p79",
                width: "medium",
                height: "small",
                type: "class"
            },
            {
                id: 5,
                title: "Cloak of Displacement",
                subtitle: "Attuned, gift from Shannix",
                body:
                    `
  While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are **incapacitated, restrained, or otherwise unable to move.**
  `,
                bottomText: "DMG p158",

                width: "small",
                height: "medium",
                type: "item"
            }
        ]);
    }
}

module.exports = new Database()