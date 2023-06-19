// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    20291번 [문자열] : 파일정리
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = '';

let file = new Map();

for (let i = 1; i < input.length; i++) {
    const afterDot = input[i].split('.')[1];
    if (file.get(afterDot) === undefined) {
        file.set(afterDot, 1);
    }
    else {
        const tmp = file.get(afterDot);
        file.set(afterDot, tmp + 1);
    }
}

let sorted = new Map([...file.entries()].sort());
let index = 1;
sorted.forEach((value, key) => {
    output += `${key} ${value}`;
    if (index !== sorted.size) {
        output += '\n';
        index++;
    }
})

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ