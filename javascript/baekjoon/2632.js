// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2632번
// 피자 판매

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = 0;

const pizza = Number(input[0]);
const secondInput= input[1].split(' ');

const m = Number(secondInput[0]);
const n = Number(secondInput[1]);

let pizzaSumA = [0];  // 피자A 누적합 
let pizzaSumB = [0];  // 피자B 누적합

let pizzaSetA = {};
let pizzaSetB = {};

for(let index = 0; index < m; index++) {
  const sum = pizzaSumA[index] + Number(input[2 + index]); 
  pizzaSumA.push(sum);
}

for(let index = 0; index < n; index++) {
  const sum = pizzaSumB[index] + Number(input[2 + m + index])
  pizzaSumB.push(sum);
}

for(let start = 1; start <= m; start++) {
  for(let end = start; end <= m; end++) {
    const startInd = start === 1 || start === m;
    const endInd = end === 1 || end === m;
    let value = pizzaSumA[end] - pizzaSumA[start - 1];

    if(pizzaSetA[value] === undefined) {
      pizzaSetA[value] = 1;
    } else {
      pizzaSetA[value]++;
    }

    if(!startInd && !endInd) {
      value = pizzaSumA[pizzaSumA.length - 1] - value;

      if(pizzaSetA[value] === undefined) {
        pizzaSetA[value] = 1;
      } else {
        pizzaSetA[value]++;
      }
    }
  }
}

for(let start = 1; start <= n; start++) {
  for(let end = start; end <= n; end++) {
    const startInd = start === 1 || start === n;
    const endInd = end === 1 || end === n;
    let value = pizzaSumB[end] - pizzaSumB[start - 1];

    if(pizzaSetB[value] === undefined) {
      pizzaSetB[value] = 1;
    } else {
      pizzaSetB[value]++;
    }

    if(!startInd && !endInd) {
      value = pizzaSumB[pizzaSumB.length - 1] - value;

      if(pizzaSetB[value] === undefined) {
        pizzaSetB[value] = 1;
      } else {
        pizzaSetB[value]++;
      }
    }
  }
}

for(let key of Object.keys(pizzaSetA)) {
  if(key < pizza) {
    const diff = pizza - key;
    if(pizzaSetB[diff] !== undefined) {
      output = output + (pizzaSetA[key] * pizzaSetB[diff]);
    }
  } 
}

if(pizzaSetA[pizza] !== undefined) {
  output += pizzaSetA[pizza];
}

if(pizzaSetB[pizza] !== undefined) {
  output += pizzaSetB[pizza];
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ