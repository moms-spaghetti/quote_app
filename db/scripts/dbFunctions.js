const { query } = require("../dbConnect");

module.exports = {
  dbInsertQuote: async (data) => {
    const sql = "INSERT INTO quotesapp (quote, username) VALUES ($1, $2)";
    const result = await query(sql, [data.quote, data.user]);
    return result.rows;
  },
  dbGetQuoteList: async () => {
    const sql = "SELECT * FROM quotesapp";
    const result = await query(sql);
    return result.rows;
  },
  dbDeleteQuote: async (quoteText, quoteCount) => {
    let sql = "DELETE FROM quotesapp WHERE id IN (";
    for (let i = 0; i < quoteCount; i++)
      if (i === quoteCount - 1) {
        sql += `$${i + 1})`;
      } else {
        sql += `$${i + 1},`;
      }
    const result = await query(sql, quoteText);
  },
};
