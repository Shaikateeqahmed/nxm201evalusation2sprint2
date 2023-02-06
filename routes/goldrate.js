const express = require("express");
const {authorise} = require("../middleware/authorise.js");
const goldrate = express.Router();

goldrate.get("/",authorise(["user","manager"]),(req,res)=>{
    res.send("goldrate page");
})

module.exports={goldrate};