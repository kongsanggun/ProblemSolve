// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 4153번
// 직각삼각형

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

for(let i = 0; i < input.length - 2; i++) {
  let isTri = input[i].split(' ').map((v) => {
    return Number(v);
  }).sort((a, b) => {
    return b - a
  })

  if(Math.pow(isTri[0], 2) === Math.pow(isTri[1], 2) + Math.pow(isTri[2], 2)) {
    output.push("right")
  } else {
    output.push("wrong")
  }
}

console.log(output.join('\n'));