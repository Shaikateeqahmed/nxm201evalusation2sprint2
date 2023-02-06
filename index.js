const express = require("express");
const {connection} = require("./config/connection.js");
const {user} = require("./routes/userroute.js");
const {authenticate} = require("./middleware/authencate");
const {goldrate} = require("./routes/goldrate.js");
const {userstats} = require("./routes/userstatsroute.js");
const app = express();
app.use(express.json());
app.use("/user",user);
app.use(authenticate);
app.use("/goldrate",goldrate);
app.use("/userstats",userstats)


app.listen(3500,async()=>{
    await connection;
    console.log(`server is running on 3500`);
})