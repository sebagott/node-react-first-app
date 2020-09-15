var express = require('express');
var router = express.Router();
var db = require('../models/index');
const fetch = require('node-fetch');
const Op = db.Sequelize.Op;

function weatherAPIRequest(mountain){
    const WEATHER_API_KEY = "3916afe1877a5215b68dd10f78ef07dc";
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${mountain.location.coordinates[0]}&lon=${mountain.location.coordinates[1]}&appid=${WEATHER_API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}


/* GET mountains by name or all if no query param. */
router.get('/', function(req, res, next) {
    if(req.query.q){
        db.Mountain.findAll({
            where: {
                name: {
                    [Op.iLike] : `%${req.query.q}%`
                }
            },
            attributes:["id","name","altitude","location"],
            raw: true,
            order: [ ["name", "ASC"]]
        }).then(mountains => {
            res.json(mountains);
        }).catch(err => {
            console.log(err);
            res.json(JSON.stringify({
                code: 500,
                error: "Internal server error. Something bad happened when fetching data."
            }))
        });
    }
    else{
        db.Mountain.findAll({
            attributes:["id","name","altitude","location"],
            raw: true,
            order: [ ["name", "ASC"]]
        }).then(mountains => {
            res.json(mountains);
        }).catch(err => {
            console.log(err);
            res.json(JSON.stringify({
                code: 500,
                error: "Internal server error. Something bad happened when fetching data."
            }))
        });
    }
});

router.get('/:mountainId/weather', function(req, res, next) {
    db.Mountain.findByPk(req.params.mountainId)
        .then(mountain => {
            const data = weatherAPIRequest(mountain).then(weather => {
                if(weather.cod === 200) {
                    res.json(weather);
                }
                else{
                    res.json(JSON.stringify({
                        code: 401,
                        error: "Sorry! We couldn't get the information from the OpenWeatherMap API."
                    }));
                }
            });
        }).catch(err => {
            console.log(err);
            res.json(JSON.stringify({
                code: 404,
                error: "Mountain Not Found"
            }))
        });

});

module.exports = router;
