const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/omnistack10", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected."));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);