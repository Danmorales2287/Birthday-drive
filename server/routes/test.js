const express = require("express");
const router= express.Router();

const getTest = async (req, res) => {
    res.status(200).json({
        message: "Test  API is working!",
    });
};

// import middlewares

//api routes
router.get('/test', getTest)

module.exports =  router;
