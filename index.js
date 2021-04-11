let env = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const db = require('./database.js');
const app = express()
const port = 3000

app.use(cors()) //TODO This might not be best practices. Investigate and consider more specific routing.
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

/**
 * While multiple walls aren't really a thing, this is fine.
 */
app.get('/debug', async (req, res) => {
    let content = await db.getWall();
    res.send(content);
});

/**
 * Get a list of walls: title, color/icon, ID. 
 */
app.get("/wall", async (req, res) => {
    let content = await db.getWallList();
    res.send(content);
});

/**
 * Get a particular wall. Wall data (like title, bg color, icon, ID) as well as the collection of embedded panels.
 * param :wallId should be objectId 
 */
app.get("/wall/:wallId", async (req, res) => {
    const wallId = req.params.wallId;
    let content = await db.getWall(wallId);
    res.send(content);
});

/**
 * Get a particular panel from a wall. Used to reset a modified (but not yet saved) panel. 
 */
app.get("/wall/:wallId/:panelId", async (req, res) => {
    const wallId = req.params.wallId;
    const panelId = Number(req.params.panelId);
    let content = await db.getPanel(wallId, panelId);
    res.send(content);
});

/**
 * Create a new wall. Body should include wall data (title, icon, iconColor, bgColor).
 */
app.post("/wall", async (req, res) => {
    let wallData = {
        title: "Untitled Wall",
        icon: null,
        iconColor: "white",
        bgColor: "#333333"
    };

    if (req.body.title != undefined)
        wallData.title = req.body.title;

    Object.keys(req.body).forEach((key) => {
        if (key in wallData) {
            wallData[key] = req.body[key];
        }
    });

    let newWall = await db.createWall(wallData)
    res.send(newWall);
});

/**
 * Create a new panel on wall. Body should include panel data (sizing, type, body, title/subtitle)
 */
app.post("/wall/:wallId", async (req, res) => {
    const wallId = String(req.params.wallId);
    let panelData = {
        title: "New Panel",
        subtitle: "",
        body: "",
        bottomText: "",
        width: "small",
        height: "height",
        panelType: "neutral"
    };

    Object.keys(req.body).forEach((key) => {
        if (key in panelData) {
            panelData[key] = req.body[key];
        }
    });

    let newPanel = await db.createPanel(wallId, panelData);
    res.send(newPanel);
});

/**
 * TODO Update the wall data. May be called in two spots (wall editor and on the general wall view page) to handle wall data as well 
 * as panel layouts. 
 */
app.put("/wall/:wallId", async (req, res) => {
    const wallId = String(req.params.wallId);

    let result = await db.updateWall(wallId, req.body);
    res.send(result);
});

/**
 * TODO Update a particular panel on a particular wall. Might have (sub)title, body text, sizing, type changes. 
 */
app.put("/wall/:wallId/:panelId", async (req, res) => {
    const wallId = String(req.params.wallId);
    const panelId = Number(req.params.panelId);

    let result = await db.updatePanel(wallId, panelId, req.body);

    res.send(result);
});

/**
 * TODO Delete an entire wall.
 */
app.delete("/wall/:wallId/", async (req, res) => {
    const wallId = String(req.params.wallId);
    let result = await db.deleteWall(wallId);
    res.send(result);
});

/**
 * TODO Delete a particular panel on a wall.
 */
app.delete("/wall/:wallId/:panelId", async (req, res) => {
    const wallId = String(req.params.wallId);
    const panelId = Number(req.params.panelId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});