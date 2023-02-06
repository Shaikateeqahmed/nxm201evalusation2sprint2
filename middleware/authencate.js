const jwt =require("jsonwebtoken");
const fs = require("fs");

const authenticate = (req,res,next)=>{
const token = req.headers.authorization;
const bl = JSON.parse(fs.readFileSync("./db.json","utf-8"))||[];
if(bl.includes(token)){
    res.send("Login Again");
}else{
    jwt.verify(token,"normal_token",(err,decode)=>{
        if(err){
            res.send("Invalid Normal Token");
        }else{
            const userID = decode.userID;
            const role = decode.role;
            req.body.userID = userID;
            req.body.role = role;
            next();
        }
    })
}
}

module.exports={authenticate};