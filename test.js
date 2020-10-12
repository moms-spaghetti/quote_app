const { query } = require("express");

async function populateTable() {
    const sql = 'INSERT INTO users (name, count, whatILike) VALUES ($1, $2, $3)';
    myCollection.map(function(value) {
        let res = await query(sql, [value.name, value.count, value.whatILike]);
        console.log(res);
    })
};

populateTable();