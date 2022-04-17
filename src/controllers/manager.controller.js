// 


const express = require("express");
const {body, validationResult} = require("express-validator");
const req = require("express/lib/request");
const bcrypt = require("bcrypt");

// router 
const router = express.Router();

// importing model
const Manager = require("../models/manager.model");

// CRUD operations 
// POST // register
router.post(
    "/register",

    body("name").notEmpty().withMessage("name cannot be empty!").isString().withMessage("name should be string").isLength({min: 3, max:25}).withMessage("name lenght should be of length between 3 and 25 characters"), 

    body("email").notEmpty().withMessage("email cannot empty!").isEmail().withMessage("invalid email").custom(async function(value) {
        try{
            const manager = await Manager.findOne({email : req.body.email}).lean().exec();
            if(manager){
                return false;
            }
            return true;
        }catch(error){
            console.log(error);
        }
    }).withMessage("user with this email already exists!"), 

    body("password").notEmpty().withMessage("please fill password field!").isLength({min : 5, max : 20}).withMessage("password length invalid"),

    async(req, res) =>{
    try{
        // validating user credentials
        let errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).send(errors.array());
        }

        await Manager.create(req.body);
        return res.status(200).send({status : true});
    }catch(error){
        console.log(error);
    }
});

// POST // login

router.post("/login", async (req, res) => {
    try{
        // checking if manager with passed email exists in db or not
        let manager = await Manager.findOne({email : req.body.email}).lean().exec();
        if(manager)
        {
            let password_matched = await bcrypt.compare(req.body.password, manager.password);
            // console.log(password_matched);
            if(password_matched)
            {
                return res.status(200).send({status : true});
            }
            return res.status(400).send({status : false});
        }
        return res.status(400).send({status : false});
    }catch(error){
        console.log(error);
    }
})




module.exports = router;