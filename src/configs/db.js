const mongoose = require("mongoose");


async function connectToDB(){
    try{
        await mongoose.connect(process.env.DBURI);
        console.log("connected to db!");
    }catch(error){
        console.log(error);
    }
}

module.exports = connectToDB;