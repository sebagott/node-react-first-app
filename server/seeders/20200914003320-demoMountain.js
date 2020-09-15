'use strict';
const fs = require('fs');
const csv = require('csv-parser');



module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let mountains = [];
    let fd = fs.createReadStream('./seeders/mountains_clean.csv');
    var end = new Promise(function(resolve, reject) {
         fd.pipe(csv())
         .on('data', (row) => {
            mountains.push({
                name: row.name,
                altitude: row.altitude,
                location: Sequelize.fn('ST_GeomFromText', `POINT(${row.lat} ${row.lon})`, 4326)
            });
        })
        .on('end', () => {
             console.log('CSV file successfully processed');
             resolve(mountains);
         })
        .on('error', reject);
      });

     await (async function() {
          let mountains = await end;
          console.log(mountains);
      }());
    return queryInterface.bulkInsert('Mountains', mountains, {});
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Mountains', null, {});
  }
};
