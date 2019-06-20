const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
