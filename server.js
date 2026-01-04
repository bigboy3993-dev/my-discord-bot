require("./index.js");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let latestCommand = null;

// STAFF JOIN
app.post("/staff-join", (req, res) => {
    console.log("STAFF JOINED:", req.body.username);
    latestCommand = {
        type: "staff-join",
        username: req.body.username
    };
    res.send("OK");
});

// STAFF LEAVE + PLAYTIME
app.post("/staff-leave", (req, res) => {
    console.log("STAFF LEFT:", req.body.username, "Playtime:", req.body.playtime);

    latestCommand = {
        type: "staff-leave",
        username: req.body.username,
        playtime: req.body.playtime
    };
    res.send("OK");
});

// BOT POLLING
app.get("/get-command", (req, res) => {
    if (!latestCommand) return res.send("none");

    const cmd = latestCommand;
    latestCommand = null;
    res.json(cmd);
});

app.listen(PORT, () => {
    console.log(`Roblox server listening on port ${PORT}`);
});

