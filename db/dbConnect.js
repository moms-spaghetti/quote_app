const { Pool } =require('pg');
require('dotenv').config();

sqlConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
}

pool = new Pool(sqlConfig);

module.exports = {
    query: (sql, value, cb) => {
        return pool.query(sql, value, cb);
    }
}