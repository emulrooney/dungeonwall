const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors()) //TODO This might not be best practices. Investigate and consider more specific routing.

app.get('/debug', (req, res) => {
  res.send(debugContent)
})

app.get('/debug/:id', (req, res) => {
    const id = Number(req.params.id);
    const dbc = debugContent.find(dbc => dbc.id === id);

    if (!dbc) {
        res.send({"status":"Couldn't find item!"});
    }

    res.send(dbc);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//Content to send:
//TODO replace w mongoDB

const debugContent = [
    {
        id: 0,
        title: "Unarmored Movement",
        subtitle: "Monk Level 1",
        body: "Armor is for tremendous cowards, go zoomie instead",
        bottomText: "PHP p76",

        panelType: "class",
        panelWidth: "medium",
        panelHeight: "medium"
    },
    {
        id: 1,
        title: "Martial Arts",
        subtitle: "Monk Level 1",
        body: "You gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield. You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table. When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn.",
        bottomText: "PHP p76",

        panelWidth: "medium",
        panelHeight: "large"
    }
];