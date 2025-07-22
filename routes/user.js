const express = require("express");
const router = express.Router();

const {signUp,login} = require("../constrollers/auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");


router.post("/signUp",signUp);
router.post("/login",login);

//adding middleware
router.get("/test", auth,(req, res)=>{
    res.json({
        success:true,
        message:"Middleware is added to test route",
    });
});

//adding middleware, first auth will run, then isStudent mW will run and then path handlers will executes.
router.get("/isStudent", auth, isStudent,(req, res)=>{
    res.json({
        success:true,
        message:"Middleware of student is added",
    });
});
router.get("/isAdmin", auth, isAdmin,(req, res)=>{
    res.json({
        success:true,
        message:"Middleware of admin is added",
    });
});

module.exports = router;