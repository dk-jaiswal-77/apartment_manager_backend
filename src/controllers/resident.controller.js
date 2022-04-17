const express = require("express");

// router
const router = express.Router();

// importing model
const Resident = require("../models/resident.model");
const Flat = require("../models/flat.model");

// CRUD operations

// post // storing single resident
router.post("/", async (req, res) => {
    try{
        let resident = await Resident.create(req.body);
        let flat = await Flat.findOne({_id : req.body.flat_id}).lean().exec();
        await Flat.findByIdAndUpdate(req.body.flat_id, {residents_count : flat.residents_count + 1});
        res.status(200).send(resident);
    }catch(error){
        console.log(error);
    }
});

// get // all residents
router.get("/", async (req, res) => {
    try{
        let residents = await Resident.find().lean().exec();
        res.status(200).send(residents);
    }catch(error){
        console.log(error);
    }
});

// get // all residents of single flat // passed flat_id as param
router.get("/:flat_id", async(req, res) => {
    try{
        let residents = await Resident.find({flat_id : req.params.flat_id}).lean().exec();
        res.status(200).send(residents);
    }catch(error){
        console.log(error);
    }
});





module.exports = router;
