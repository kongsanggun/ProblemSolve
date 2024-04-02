// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 15807번
// 빛영우

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = "";

const N = Number(input[0]); // 조명
const P = Number(input[N + 1]); // 영우

let lightInField = Array.from(Array(3001), () => Array(3001).fill(0)); // 조명 필드
let lightOutField = Array.from(Array(3001), () => Array(3001).fill(0)); // 조명 필드

for(let i = 1; i <= N; i++) {
  const lightInput = input[i].split(' ').map((v) => {return Number(v) + 1500;})
  const xInput = lightInput[0];
  const yInput = lightInput[1];

  lightInField[yInput][xInput] = lightInField[yInput][xInput] + 1;
  if(xInput !== 3000) {
    lightOutField[yInput][xInput + 1] = lightOutField[yInput][xInput + 1] + 1;
  } 
}

for(let y = 1; y <= 3000; y++) {
  for(let x = 0; x <= 3000; x++) {
    if(x !== 3000) {
      lightInField[y][x] = lightInField[y][x] + lightInField[y - 1][x + 1];
    } 
    if(x !== 0) {
      lightOutField[y][x] = lightOutField[y][x] + lightOutField[y - 1][x - 1];
    } 
  }
  lightInField[y][0] = lightInField[y][0] + lightInField[y - 1][0];
}


for(let y = 0; y <= 3000; y++) {
  for(let x = 1; x <= 3000; x++) {
    lightInField[y][x] = lightInField[y][x] + lightInField[y][x - 1];
    lightOutField[y][x] = lightOutField[y][x] + lightOutField[y][x - 1];
  }
}

for(let i = 1; i <= P; i++) {
  const printInput = input[i + N + 1].split(' ').map((v) => {return Number(v) + 1500;})
  const value = lightInField[printInput[1]][printInput[0]] - lightOutField[printInput[1]][printInput[0]];
  output = output + value
  if(i !== P) {
    output = output + '\n';
  }
}

console.log(output);