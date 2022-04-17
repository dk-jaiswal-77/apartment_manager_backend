const express = require("express");
require("dotenv").config();

// connecting to db
const connectToDB = require("./configs/db");
connectToDB();

// creating express app
const app = express();

// global middleware
app.use(express.json());


// importing controllers
const managerController = require("./controllers/manager.controller");
const flatController = require("./controllers/flat.controller");
const residentController = require("./controllers/resident.controller");



// directing request to respective controllers
app.use("/manager", managerController);
app.use("/flats", flatController);
app.use("/residents", residentController);



// listening to port 3007
app.listen(3007);