// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 14224번
// 트리 만들기

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";
let result = [];

const n = Number(input[0].split(' ')[0]);
const m = Number(input[0].split(' ')[1])

const count = n + 2 - m;

for(let index = 0; index < count - 1; index++) {
  result.push(index + " " + (index + 1))
}

for(let index = count; index < n ; index++) {
  result.push(1 + " " + (index))
}

output = result.join('\n');
console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ