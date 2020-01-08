// 공백, 빈 값, 중복 값을 모두 제거한 뒤에 database에 저장
const fs = require('fs'); //fs - file system의 약자
const connection = require('./database/SQLDatabase');
const rawKeywords = './data/eat_sleep_burn/rawData.txt';
const sortedRawKeywords = './data/eat_sleep_burn/new.txt';
const table = 'diet';
let keywordArr;

const RESOURCE = 'bing';

let data = fs.readFileSync(rawKeywords, {encoding : "utf-8"});

//한 줄 기준으로 어레이로 만들어 줌
keywordArr = data.toString().split('\n');

//빈 값 제거
keywordArr = keywordArr.filter((keyword) => {
    return keyword !== '';
});

//특수 문자 및 공백 제거
keywordArr.forEach((keyword, index) => {
    keywordArr[index] = keyword
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').split('/')[0] //URL 제거
        .replace(/[^a-zA-Z0-9 ]/g, '')  //특수문자 제거
        .trim(); //앞 뒤 공백 제거
});

//중복값 제거
keywordArr = keywordArr.filter((keyword, index) => {
    return keywordArr.indexOf(keyword) === index;
});

// 공백, 빈 값, 중복값
keywordArr.forEach(((keyword, index) => {
    fs.appendFileSync(sortedRawKeywords, keywordArr[index] + "\n", (error) => {
        if(error){
            console.log(error);
            return;
        }

    });
}));

// // DB에 값 넣기
keywordArr.forEach((keyword, index) => {
    connection.query(`INSERT INTO ${table}(keyword, resource) VALUES (?, ?)`, [keyword, RESOURCE], (error, result) => {
        console.log(result);
        if(error){
            console.log(error);
        }
    });
});
