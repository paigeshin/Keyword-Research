const connection = require('./database/SQLDatabase');
const fs = require('fs');
// const perfectKeyword = './backup/newData.txt';
const table = 'diet';

let perfectKeywords = [];

const data = [100]; //  0 , 1 AND competition >= ? AND competition <= ?
connection.query(`SELECT * FROM ${table} WHERE search_volume >= ? `, data, (error, result) => {

    result.forEach((data) => {
       perfectKeywords.push(data.keyword);
       console.log(data.keyword);
    });
    // console.log(perfectKeywords);
    // let keywords = fs.readFileSync(perfectKeyword, {encoding : "utf-8"}).toString().split('\n');
    //
    // keywords = keywords.filter((keyword) => {
    //     return keyword.includes('$');
    // });

    // keywords.forEach((keyword) => {
    //     perfectKeywords.push(keyword
    //         .replace('$', '')
    //         .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
    //         .replace(/[^a-zA-Z0-9 ]/g, ''));
    // });

    // perfectKeywords.filter((keyword, index) => {
    //     return perfectKeywords.indexOf(keyword) === index;
    // });
    //
    // perfectKeywords.forEach((keyword, index) => {
    //     console.log(keyword);
    // });

    // console.log(perfectKeywords.length);
});



