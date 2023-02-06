const express = require("express");
const {UserModel} = require("../modules/usermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const user = express.Router();

user.post("/signup",async(req,res)=>{
    const {name,email,password,role} = req.body;
    const user = await UserModel.find({email});
    if(user.length>0){
        res.send("User with this Email is already Exists!");
    }else{
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            console.log(err);
        }else{
         const userdata = new UserModel({name,email,password:hash,role});
         await userdata.save();
         res.send("sucessfully Signup!");
        }
    })
    }
})

user.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.find({email});
    if(user.length>0){
    bcrypt.compare(password,user[0].password,(err,result)=>{
        if(err){
            res.send("Invalid Login Crediantials!");
        }else{
            //1 min = 60000 ms
            //5min = 300000 ms
            const normal_token = jwt.sign({userID:user[0]._id,role:user[0].role},"normal_token",{expiresIn:"60sec"});
            const Refresh_token = jwt.sign({userID:user[0]._id,role:user[0].role},"refresh_token",{expiresIn:"300sec"});
            res.send({normal_token,Refresh_token});
        }

    })
    }else{
        res.send("Signup first!")
    }
})
user.get("/logout",(req,res)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"normal_token",(err,decode)=>{
            if(err){
                res.send("Logout");
            }else{
                const bl = JSON.parse(fs.readFileSync("./db.json","utf-8"))||[];
                if(bl.includes(token)){
                    res.send("Already logout");
                }else{
                    bl.push(token);
                    fs.writeFileSync("./db.json",JSON.stringify(bl));
                    res.send("logout Sucessfully!");
                }
            }
        })
        
    }else{
        res.send("login first!")
    }
    
})

user.get("/newnormaltoken",async(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token,"refresh_token",(err,decode)=>{
        if(err){
            res.send("invalid Refresh token");
        }else{
            const userID = decode.userID;
            const role = decode.role;
            const token = jwt.sign({userID,role},"normal_token",{expiresIn:"60sec"});
            res.send({token});
        }
    })
})
module.exports={user};