const  log = (req,res,next) =>{
    console.log(req.path);
    next();
};

module.exports = log;