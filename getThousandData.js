const connection = require('./database/SQLDatabase');
const startValue = 5000;
const endValue = 1000;
const table = 'dating';

connection.query(`SELECT * FROM ${table}`, [], (error, result) => {
    // console.log(result.length);
});

connection.query(`SELECT * FROM ${table} LIMIT ?, ?`, [startValue, endValue], (error, result) => {
    // console.log(result.length);
    result.forEach((data) => {
        console.log(data.keyword);
    })
});
