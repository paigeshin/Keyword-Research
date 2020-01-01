const fs = require('fs'); //fs - file system의 약자
const rawKeywords = './data.txt';
let keywordArr;

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
        .replace(/[^a-zA-Z ]/g, '')  //특수문자 제거
        .trim(); //앞 뒤 공백 제거
});

//중복값 제거
keywordArr = keywordArr.filter((keyword, index) => {
   return keywordArr.indexOf(keyword) === index;
});

// 공백, 빈 값, 중복값을 제거한 어레이를 통해서 file을 씀
keywordArr.forEach(((keyword, index) => {
    fs.appendFileSync('newData.txt', keywordArr[index] + "\n", (error) => {
        if(error){
            console.log(error);
            return;
        }
    });
}));



