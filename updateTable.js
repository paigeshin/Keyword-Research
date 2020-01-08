const fs = require('fs');
const csv = require('csv-parser');
const csvtojson = require('csvjson');
const connection = require('./database/SQLDatabase');
const table = 'diet';

const PATH = './data/eat_sleep_burn/search_volume/20_01_04/8.csv';

//Json화
const fileContent =  fs.readFileSync(PATH, 'ucs2');
const options = {
    delimiter: "\t",
};
const csvDataArr = csvtojson.toObject(fileContent, options); //어레이임.

// '﻿Ad group': 'Best Tea Weight Loss',
//     Keyword: 'best loss tea weight white',
//     'Average monthly searches': '-',
//     'Suggested bid (USD)': '-',
//     Competition: '0.00',
//     'Ad impr. share': ''

// keyword VARCHAR(255) NOT NULL,
// ad_group VARCHAR(50) NOT NULL DEFAULT "not grouped",
// search_volume INT NOT NULL DEFAULT 0,
// competition FLOAT NOT NULL DEFAULT 0,
// bid_usd FLOAT NOT NULL DEFAULT 0,
// resource VARCHAR(11) NOT NULL,
// PRIMARY KEY(keyword)

connection.query(`SELECT * FROM ${table}`, [], (error, dbData) => {

    let dbKeywordArr = [];
    let csvKeywordArr = [];

    for (let i = 0; i < dbData.length; i++) {
        dbKeywordArr.push(dbData[i].keyword);
    }

    for (let i = 0; i < csvDataArr.length; i++) {
        csvKeywordArr.push(csvDataArr[i]['Keyword']);
    }

    let count = 0;
    dbKeywordArr.forEach((dbKeyword) => csvKeywordArr.forEach((csvKeyword, csvIndex) => {
        if(dbKeyword === csvKeyword){
            count++;
            let sql = `UPDATE ${table} SET ad_group = ?, search_volume = ?, competition = ?, bid_usd = ? WHERE keyword = ?`;
            let data = [
                csvDataArr[csvIndex]['﻿Ad group'],
                csvDataArr[csvIndex]['Average monthly searches'] === '-' ? 0 : csvDataArr[csvIndex]['Average monthly searches'].replace(',', ''),
                csvDataArr[csvIndex].Competition === '-' ? 0 : csvDataArr[csvIndex].Competition,
                csvDataArr[csvIndex]['Suggested bid (USD)'] === '-' ? 0 : csvDataArr[csvIndex]['Suggested bid (USD)'],
                dbKeyword
            ];
            connection.query(sql, data, (error, result) => {
                if(error){
                    console.log(error);
                } else {
                    console.log(result);
                }
            })
        }
    }));

    console.log(`총 카운트 ${count}`);


});




/*
    fs
        .createReadStream(PATH, {encoding: 'utf16le', columns: true})
        .on('error', (error) => {
            console.log(error);
        })
        .pipe(csv())
        .on('data', (data) => {

            fs.writeFile('hello.json', data, (error) => {
                if (error) throw error;
            });

        })
        .on('end', () => {
            console.log('Read finished');
        });
*/

/*
내가 하고 싶은 것
csv file을 json 형식으로 변환
json 형식으로 변환해서 데이터베이스에 search volume 및 경쟁률 업데이트
업데이트 후에 search volume 및 경쟁률 기준으로 값을 가져옴

현재 문제가 되고 있는 것
어떻게 데이터를 매칭 시킬 것인가..

🔴 문제해결
1. utf16le, ucs2 등을 encoding 값으로 두면 utf16 Unicode가 깨지지 않고 encoding이 된다.
2. 데이터 매칭, 옵션을 추가해준다.
const options = {
        delimiter: "\t",
    };

* */