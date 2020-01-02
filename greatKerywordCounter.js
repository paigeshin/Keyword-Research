//얼마나 키워드를 sorting 해줬는지 확인

const fs = require('fs'); //fs - file system의 약자
const newKeywords = './newData.txt';

let data = fs.readFileSync(newKeywords, {encoding : "utf-8"});

//한 줄 기준으로 어레이로 만들어 줌
keywordArr = data.toString().split('\n');

keywordArr = keywordArr.filter((keyword) => {
    return keyword.includes('$');
});


keywordArr.forEach((keyword, index) => {
    keywordArr[index] = keyword.replace('$', '');
});

keywordArr.forEach((keyword, index) => {
   console.log(keyword);
});

console.log(keywordArr.length - 1);