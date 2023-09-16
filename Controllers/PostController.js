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


exports.getPostById = (req,res) =>{
    try{

        let {id} = req.params;
        

        const requiredFields =["id"];

        errorMessage = getErors(req.params,requiredFields);


        if(errorMessage){
            return res.status(500).send(errorMessage);
        }

        const sql = 'select * from posts where id = (?)';
        const values=[id];

        db.query(sql,values, async (err,results) =>{
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
            if(results.length == 0){
                console.log("No results found");
                return res.status(500).send(JSON.stringify({"message":"No results found"}));
            }
            console.log(results);

            return res.status(200).send(results);
        });


    }
    catch(err){
        return res.status(500).send(err);
    }
};

exports.getPosts = async (req,res) =>{
 try{
    const sql = 'select * from posts';

    db.query(sql,(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        res.status(200).send(JSON.stringify(results));
    });
    
 }
 catch(err){
    console.error(err);
    return res.status(500).send(err);
 } 
}