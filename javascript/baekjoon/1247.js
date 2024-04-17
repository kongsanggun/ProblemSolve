// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1247번 : 부호

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];
let count = 0;

for(let index = 0; index < 3; index++) {
  const N = Number(input[count])

  let sum = 0n
  for(let i = count + 1; i <= count + N ; i++) {
    const sumInput = BigInt(input[i])
    sum += sumInput
  }

  if(sum === 0n) {
    output.push('0')
  } else if(sum > 0n) {
    output.push('+')
  } else {
    output.push('-')
  }

  count += (N + 1);
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ