var express = require('express');
var router = express.Router();
var user = require("../models/users");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// For jwt authentication
const jwt = require('jsonwebtoken');
const jwtsecret = "9999777ggvv666nhhhhh";


router.get("/user-details", async (req, res, next) => {
    //console.log("Hello");
    //res.json("hello varun")
    try {
        const data = await user.find({})
        // console.log(data);
        res.status(201).send({
            success: true,
            message: "Data fetch successfully !",
            data
        });
    } catch (error) {
        console.log(error);
    }
})

router.post("/user-details", async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.body.email_id);
    // console.log(req.body.mob_num);
    try {

        const data = await new user({
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            age: req.body.age,
            qli: req.body.qli,
            gender: req.body.gender,
            email_id: req.body.email_id,
            mob_num: req.body.mob_num,
            state: req.body.state,
            city: req.body.city,
            pass: req.body.pass
        }).save();

        res.status(201).send({
            success: true,
            message: "User Added Successfully",
            data
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/user-details/:id", async (req, res, next) => {
    try {
        const response = await user.findOneAndDelete({ "_id": req.params.id })
        // res.status(201).send({
        //    success:true,
        //    message:"Data Deleted Successfully !",
        //    data
        if (response) {
            return res.status(201).send({
                success: true,
                message: "User Deleted Successfully !"

            });
        }
        else {
            return res.status(201).send({
                succcess: false,
                message: "User Not Deleted !"
            });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

router.get("/user-details/:id", async (req, res, next) => {
    try {
        const data = await user.findOne({ "mob_num": req.params.id })
        //console.log(data);
        if (data) {
            return res.status(201).send({
                success: true,
                messsage: "Data Fetch Successfully !",
                data
            });

        }
        else {
            return res.status(201).send({
                success: false,
                message: "Mobile no Doesn't exist !"

            })
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.put("/user-details", async (req, res, next) => {
    //console.log(req.body);
    let email = req.body.email_id;
    try {
        const data = ({

            f_name: req.body.f_name,
            l_name: req.body.l_name,
            age: req.body.age,
            qli: req.body.qli,
            gender: req.body.gender,
            email_id: req.body.email_id,
            mob_num: req.body.mob_num,
            state: req.body.state,
            city: req.body.city,
            pass: req.body.pass
        });
        const response = await user.findOneAndUpdate({ 'email_id': email }, data)
        if (response) {
            return res.send({
                status: true,
                message: "User Record Updated Successfully !",
                response
            })
        }
        else {
            return res.send({
                status: false,
                message: "Record Not Updated"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.post("/sign-up", async (req, res, next) => {

    try {

        let c_pass = req.body.password;
        const hash = bcrypt.hashSync(c_pass, saltRounds);
        const data = await new user({
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email_id: req.body.email_id,
            mob_num: req.body.mob_num,
            pass: hash
        }).save();

        res.status(201).send({
            success: true,
            message: "Sign Up Successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
    }

})

router.post("/login", async (req, res, next) => {
    console.log(req.body);
    let pass = req.body.password;
    let username = req.body.username;
    try {

        const recive = await user.findOne({ email_id: username })
        //console.log(recive);
        if (recive) {
            if (bcrypt.compareSync(pass, recive.pass)) {
                let payload = { uid: username };
                let token = jwt.sign(payload, jwtsecret, { expiresIn: 360000 });
                return res.status(201).send({
                    success: true,
                    message: "Login Successfully",
                    token,

                });
            }
            else {
                console.log("Username or password in not match");
            }

        }
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;