var express = require('express');

var router = express.Router();

router.get("/", function(req, res){
    res.json("Lmao i dont know what json is");
});

module.exports = router;

