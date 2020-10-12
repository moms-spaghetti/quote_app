const { response } = require('express');
const { query } = require('../dbConnect');

module.exports = {
    dbInsertQuote: (quote) => {
        const sql = "INSERT INTO quotes (quote) VALUES ($1)";
        const result = query(sql, [quote]);
    },
    dbGetQuoteList: async _ => {
        const sql = "SELECT * FROM quotes";
        const result = await query(sql);
        return result.rows;
    },
    dbDeleteQuote: async (quoteText, quoteCount) => {
        let sql = "DELETE FROM quotes WHERE id IN (";
        for(let i = 0; i < quoteCount; i++ )
        if (i === quoteCount -1) {
            sql += `$${i+1})`;
        } else {
            sql += `$${i+1},`;
        }
        const result = await query(sql, quoteText);
    }
}
