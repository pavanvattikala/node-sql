const express = require('express');

const authRouter = require("./Routers/AuthRouter");
const postRouter = require("./Routers/PostRouter");

require('dotenv').config();

const app = express();


app.use(express.json());


app.use('/auth',authRouter);

app.use('/post',postRouter);

port = process.env.port || 5000;

app.listen(port,()=>{
    console.log("Server is Running");
});