const mongoose = require("mongoose");
require('dotenv').config()
const db = async()=>{
    try {
        let username=process.env.username
        let dbname=process.env.username
        let cluster=process.env.username
        let password=process.env.username
      const connected =  await mongoose.connect(
        // `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        `mongodb+srv://ayushsharmarit:O9yidyNAGDndK7dP@cluster0.m2q2ngw.mongodb.net/userdb?retryWrites=true&w=majority`
      );
      console.log(connected.connection.name + ' connected with mongodb !');
    } catch (error) {
       console.log( error.message , "Something went wrong while connecting mongodb!"); 
    }
}

module.exports = {db}
