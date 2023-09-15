const db = require("../Database/DatabaseConnection");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcrypt');

exports.signup = async (req,res) => {

    try{
        const {name,email,password} = req.body;

        requiredFields = ["name","email","password"];

        errorMessage = getErors(req.body,requiredFields);

        if(errorMessage){
            return res.send(errorMessage);
        }

        const sql = "insert into users (name,email,password) values(?,?,?)";

        let hashedPassword = await bcrypt.hash(password,15);

        const values = [name,email,hashedPassword];

        db.query(sql,values,async (err,results) =>{

            if(err){
                return res.status(500).send(err.sqlMessage);
            }
            
            return res.status(200).send(JSON.stringify({"message":"User Created Successfully"}));

        });    
    }
    catch(err){
        return res.status(500).send("Internal Server Error");
    }
    
};




exports.login = async (req,res) => {

    const {email,password} = req.body;

    requiredFields = ["email","password"];

    errorMessage = getErors(req.body,requiredFields);

    if(errorMessage){
        return res.send(errorMessage);
    }

    const sql = "select * from users where email=?";

    const values = [email];

    db.query(sql,values,async (err,results) =>{

        if(err){
            console.log("DB Error");
            return res.status(500).send("Internal Server Error");
        }
        else if(results.length==0){
            return res.status(401).send("Invalid details");
        }
        else{
            const user = results[0];

            let isUserValid = await bcrypt.compare(password, user.password);

            if(isUserValid){
                const token = generateAccessToken(user.name,user.id);

                return res.status(200).send(JSON.stringify({"Token":token,"Message":"user authenticated sucessfully"}));

            }
            else{
                return res.send(401).send("Invalid Details");
            }

        }


    });    

};

const getErors = (dataFelids, requiredFields) => {

    let errors={};

    for (const field of requiredFields) {
       
        if (!(field in dataFelids)) {
            console.log(field);
            errors[field] = field+" is Missing";
        }
    }
        
    let errorCount = Object.keys(errors).length

    if(errorCount>0){
        return JSON.stringify(errors);
    }
    else {
        return null; // No errors
    }
}

function generateAccessToken(username,id) {
    return jwt.sign({name:username,id:id}, process.env.JWT_Token);
}