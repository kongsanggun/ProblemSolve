// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 24023번
// 아기 홍윤

let input = require('fs').readFileSync('./input').toString().split('\n');
let output = -1;

const firstInput = input[0].split(' ').map(v => Number(v));
const K = firstInput[1];   // 목표 값
const A = input[1].split(' ').map(v => Number(v));   // 배열

let result = [1, 0];
let bitmask = 0;
for(let index in A) {
   if(bitmask !== K) {
      bitmask = bitmask | A[index];
      if((bitmask | K) !== K) {
         bitmask = 0;
         result[0] = Number(index) + 2;
      } else if(bitmask === K){
         result[1] = Number(index) + 1;
         output = result.join(' ')
      }
   }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ