let env = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const db = require('./database.js');
const app = express()
const port = 3000

app.use(cors()) //TODO This might not be best practices. Investigate and consider more specific routing.
var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({ extended: false }); TODO May not need this... dig into express bodyParser docs

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
 * TODO Get a list of walls: title, color/icon, ID. 
 */
app.get("/wall", async (req, res) => {
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * Get a particular wall. Wall data (like title, bg color, icon, ID) as well as the collection of embedded panels.
 */
app.get("/wall/:wallId", async (req, res) => {
    const wallId = Number(req.params.wallId);
    let content = await db.getWall(wallId);
    res.send(content);
});

/**
 * TODO Get a particular panel from a wall. Used to reset a modified (but not yet saved) panel. 
 */
app.get("/wall/:wallId/:panelId", async (req, res) => {
    const wallId = Number(req.params.wallId);
    const panelId = Number(req.params.panelId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * TODO Create a new wall. Body should include wall data (title, icon, iconColor, bgColor).
 */
app.post("/wall", async (req, res) => {
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * TODO Create a new panel on wall. Body should include panel data (sizing, type, body, title/subtitle)
 */
app.post("/wall/:wallId", async (req, res) => {
    const wallId = Number(req.params.wallId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * TODO Update the wall data. May be called in two spots (wall editor and on the general wall view page) to handle wall data as well 
 * as panel layouts. 
 */
app.put("/wall/:wallId", async (req, res) => {
    const wallId = Number(req.params.wallId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * TODO Update a particular panel on a particular wall. Might have (sub)title, body text, sizing, type changes. 
 */
app.put("/wall/:wallId/:panelId", async (req, res) => {
    const wallId = Number(req.params.wallId);
    const panelId = Number(req.params.panelId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * TODO Delete an entire wall.
 */
app.delete("/wall/:wallId/", async (req, res) => {
    const wallId = Number(req.params.wallId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});

/**
 * TODO Delete a particular panel on a wall.
 */
app.put("/wall/:wallId/:panelId", async (req, res) => {
    const wallId = Number(req.params.wallId);
    const panelId = Number(req.params.panelId);
    let content = console.log("Not yet implemented.");
    res.send(content);
});