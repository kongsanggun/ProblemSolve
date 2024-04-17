// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 14226번 : 이모티콘
// BFS

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let S = Number(input[0])

let isVisit = Array(2001).fill(false);
isVisit[1] = true

let stack = [[1, 0, 0]]; // count, copy, times
let stackIndex = 0;

while(stack[stackIndex][0] !== S && stack.length > stackIndex) {
  const [count, copy, times] = stack[stackIndex];

  // sub
  if(count > 1 && !isVisit[count - 1]) {
    stack.push([count - 1, copy, times + 1])
    isVisit[count - 1] = true
  }

  // copy
  if(count != copy) {
    stack.push([count, count, times + 1])
  }

  // paste
  if(copy > 0) {
    stack.push([count + copy, copy, times + 1])
    isVisit[count + copy] = true
  }

  stackIndex++;
}

console.log(stack[stackIndex][2]); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
