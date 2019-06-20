const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
