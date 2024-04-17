// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 11602번 : 카드 게임

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let T = Number(input[0])
let output = [];

for(let test = 0; test < T; test++) {
  const N = Number(input[test * 2 + 1])
  const card = input[test * 2 + 2].split(' ').map((v) => {return Number(v)})

  
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ