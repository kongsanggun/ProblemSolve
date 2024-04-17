// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2751번 : 수 정렬하기 2

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let N = Number(input[0])
let output = [];

for(let index = 1; index <= N; index++) {
  output.push(Number(input[index]))
}

output = output.sort((a, b) => {
  return a - b
})

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ