const { query } = require("../dbConnect");

const sql = `
    DROP TABLE IF EXISTS quotesapp;
    CREATE TABLE IF NOT EXISTS quotesapp (
    id SERIAL PRIMARY KEY,
    quote TEXT,
    username TEXT
    )`;

const createTable = async () => {
  const res = await query(sql);
  console.log(res);
};

createTable();
