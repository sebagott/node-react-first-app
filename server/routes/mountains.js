var express = require('express');
var router = express.Router();
var db = require('../models/index');
const Op = db.Sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
    db.Mountain.findByPk(1).then(mountain => {
        res.json([
            {
                id: mountain.id,
                name: mountain.name,
                altitude: mountain.altitude,
                location: mountain.location.coordinates
            }
        ]);
    }).catch(err => {
        console.log(err)
        res.json({err: err})
    });

});

module.exports = router;
