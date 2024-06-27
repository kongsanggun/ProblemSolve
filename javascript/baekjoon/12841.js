// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 12841번 : 정보대 등산

let input = require('fs').readFileSync("input.txt").toString().split('\n')
let output = [-1, 9876543210];

const N = Number(input[0])
let cross = input[1].split(' ').map((v) => {return Number(v);})
let left = input[2].split(' ').map((v) => {return Number(v);})
let right = input[3].split(' ').map((v) => {return Number(v);})

let leftSum = 0;
let rightSum = 0;
for(let value of right) {
  rightSum += Number(value);
}

for(let index in cross) {
  if(output[1] > leftSum + cross[index] + rightSum) {
    output = [Number(index) + 1, leftSum + cross[index] + rightSum]
  }

  if(Number(index) < left.length) {
    leftSum += left[index];
    rightSum -= right[index];
  }
}

console.log(output.join(' ')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ