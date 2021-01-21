const { Pool } = require("pg");
require("dotenv").config();

sqlConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

pool = new Pool(sqlConfig);

module.exports = {
  query: (sql, value, cb) => {
    return pool.query(sql, value, cb);
  },
};
