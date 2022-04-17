const express = require("express");

// router
const router = express.Router();

// importing model 
const Flat = require("../models/flat.model");

//CRUD operations 
// post // store single flat at a time
router.post("/", async (req, res) => {
    try{
        let flat = await Flat.create(req.body);
        res.status(200).send(flat);
    }catch(error){
        console.log(error);
    }
});

// get all the flats details
router.get("/", async (req, res) => {
    try{
        let flat = await Flat.find().lean().exec();
        res.status(200).send(flat);
    }catch(error){
        console.log(error);
    }
});

// get // 10 flats per page // page as param
router.get("/:page_count", async (req, res) => {
    try{
        let skip_count = +(req.params.page_count);
        skip_count = (skip_count - 1) * 10; 
        let flats = await Flat.find().skip(skip_count).limit(10).lean().exec();
        return res.status(200).send(flats);
    }catch(error){
        console.log(error);
    }
});




module.exports = router;