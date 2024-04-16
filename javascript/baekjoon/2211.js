// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2211번 : 네트워크 복구

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

let firstLine = input[0].split(' ').map((v) => {return Number(v)})
const N = firstLine[0]
const M = firstLine[1]

let network = Array.from(Array(N + 1), () => {return []})
let value = Array.from(Array(N + 1), () => {return [Infinity, false, []]})
output.push(N - 1)

const findCarent = () => {
  let result = 0;

  for(let index in value) {
    if(!value[index][1] && value[result][0] > value[index][0]) {
      result = Number(index)
    }
  }

  return result;
}

for(let index = 1; index <= M; index++) {
  const line = input[index].split(' ').map((v) => {return Number(v)})

  const A = line[0]
  const B = line[1]
  const C = line[2]

  network[A].push([A, B, C])
  network[B].push([B, A, C])
}

let carent = 1;
value[1][0] = 0;

for(let i = 0; i < N - 1; i++) {
  value[carent][1] = true

  for(let node of network[carent]) {
    if(!value[node[1]][1] && value[node[1]][0] > value[carent][0] + node[2]) {
      value[node[1]][0] = value[carent][0] + node[2]
      value[node[1]][2] = [...node]
    }
  }

  carent = findCarent();
  output.push(value[carent][2][0] + " " + value[carent][2][1])
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ