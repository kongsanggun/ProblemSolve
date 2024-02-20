// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 15809번

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

class CountryNode {
  constructor(name, value) {
    this.list = [name];
    this.power = value;
  }
}

let firstInput = input[0].split(" ");
const N = Number(firstInput[0]);
const M = Number(firstInput[1]);

let country = {};
let countrySet = [];
let result = [];

for(let index = 0; index < N; index++) {
  country[index + 1] = new CountryNode(index + 1, Number(input[index + 1]));
  countrySet[index + 1] = index + 1;
}

for(let index = 0; index < M; index++) {
  const commandIndex = index + N + 1;
  const command = input[commandIndex].split(' ').map((v) => {return Number(v)});
  
  const commandA = countrySet[command[1]];
  const commandB = countrySet[command[2]];

  const countryA = country[commandA];
  const countryB = country[commandB];

  if(command[0] === 1) {
    // 동맹을 맺음
    countryA.power = countryA.power + countryB.power;
  } else {
    // 전쟁을 함
    countryA.power = Math.abs(countryA.power - countryB.power);
  }

  countryA.list = [...countryA.list, ...countryB.list];
  for(let node of countryB.list) {
    countrySet[node] = commandA;
  }
  delete country[commandB];
  if(countryA.power === 0) {
    delete country[commandA];
  } 
}

const resultCountry = Object.keys(country);
output += resultCountry.length + "\n";

for(let key of resultCountry) {
  const power = country[key].power;
  result.push(power);
}

output += result.sort((a, b) => {return a - b;}).join(' ');
console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ