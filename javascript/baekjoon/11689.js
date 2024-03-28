// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 11689번
// GCD(n, k) = 1
// 소수 갯수 찾기

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = 0;
let nList = [];

let N = Number(input[0]);
output = N;

// 소인수 구하기
for(let com = 2; com * com <= N; com++) {
  if(N % com === 0) {
    nList.push(com);
  }
  while(N % com === 0) {
    N = N / com;
  }
}

if(N > 1) {
  nList.push(N);
}

for(let i = 0; i < nList.length; i++) {
  const value = 1 - (1 / nList[i]);
  output = Math.round(output * value);
}

console.log(output)