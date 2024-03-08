// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2825번
// 수업시간에 교수님 몰래 교실을 나간 상근이

let input = require('fs').readFileSync('./input').toString().split('\n');
let output = 0;

const N = Number(input[0]);
let bitmaskSet = {};      // 비트마스킹용 Set

for(let index = 1; index <= N; index++) {
   let bitmask = 0;
   const inputNumber = input[index];
   for(let num of inputNumber) {
      bitmask = bitmask | (1 << Number(num));
   }
   
   if(bitmaskSet[bitmask] === undefined) {
      bitmaskSet[bitmask] = 1;
   } else {
      bitmaskSet[bitmask]++;
   }
}

const bitmaskSetKeys = Object.keys(bitmaskSet);

for(let index = 0; index < bitmaskSetKeys.length; index++) {
   const keyI = bitmaskSetKeys[index];
   for(let jndex = 0; jndex < bitmaskSetKeys.length; jndex++) {
      const keyJ = bitmaskSetKeys[jndex];
      if((Number(keyI) & Number(keyJ)) !== 0) {
         output += bitmaskSet[keyI] * bitmaskSet[keyJ];
      }
   }
}

output = (output - N) / 2;

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ