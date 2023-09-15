const db = require("../Database/DatabaseConnection");

const getErors = require("../Utils/Validator");


exports.createPost = (req,res) => {

    try{

        const {postTitle,postBody,postFooter} = req.body;
        const requiredFields = ["postTitle","postBody"];

        const userId = req.user.id;

        errorMessage = getErors(req.body,requiredFields);

        if(errorMessage){
            return res.status(500).send(errorMessage);
        }

        const sql = 'INSERT INTO posts (userId, postTittle, postBody, postFooter) VALUES (?,?,?,?)';

        const values = [userId,postTitle,postBody,postFooter || null];

        db.query(sql,values,(err,results) =>{
            if(err){
                return res.status(500).send("Internal Server Error"+err);
            }
            else{
                return res.status(200).send("Post Created Sucessfully");
            }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error"+err);
    }

};
