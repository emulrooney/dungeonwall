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

app.get('/debug', async (req, res) => {
    let content = await db.getDebugContent();
    res.send(content);
})

app.get('/debug/:id', (req, res) => {
    const id = Number(req.params.id);
    const dbc = debugContent.find(dbc => dbc.id === id);

    if (!dbc) {
        res.send({ "status": "Couldn't find item!" });
    }

    res.send(dbc);
})

app.post('/wall/:wallId/:panelId', jsonParser, (req, res) => {
    const wallId = Number(req.params.wallId);
    const panelId = Number(req.params.panelId);



});