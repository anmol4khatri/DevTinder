const express = require("express");
const app = express();

app.use("/test", (req, res) => {
    res.send("just testing");
});

app.use("/hello", (req, res) => {
    res.send("hello bhai");
});

app.listen(7777, () => {
    console.log("Connected to the server at port 7777");
});