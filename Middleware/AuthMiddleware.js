const jwt = require("jsonwebtoken");
require("dotenv").config();



const authenticate = (req,res,next) => {

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).send("No token has been passed");
    }

    jwt.verify(token.split(" ")[1],process.env.JWT_Token,(err,result) => {
        if(err){
            console.log("Invalid Token");
            return res.status(401).send("Invalid Token"+err);
        }


        req.user = result;

        next();

    });


};


module.exports = authenticate;