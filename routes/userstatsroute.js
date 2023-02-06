const express = require("express");
const {authorise} = require("../middleware/authorise.js");
const userstats = express.Router();

userstats.get("/",authorise(["manager"]),(req,res)=>{
    res.send("userstats page");
})

module.exports={userstats};