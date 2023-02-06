const authorise = (user_arr)=>{
    return (req,res,next)=>{
    const role = req.body.role;
    if(user_arr.includes(role)){
        next();
    }else{
        res.send("NOt Authorised");
    }
    }
}

module.exports={authorise};