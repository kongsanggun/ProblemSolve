// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 25187번
// 고인물이 싫어요

class water {
  constructor(cleanliness) {
    this.cleanliness = cleanliness;
    this.visited = 0; // 0 : 방문 안 함, 1 : 방문 중, 2 ㅣ 방문 완료
    this.pipe = [];
  }
}

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

let waters = [];
let isClean = [];

const firstInput = input[0].split(' ').map(v => Number(v));
const N = firstInput[0];
const M = firstInput[1];
const Q = firstInput[2];

let visited = Array(N).fill(false);

// 물탱크 설정
const initWaterTank = () => {
  for(let cleanliness of input[1].split(' ')) {
    waters.push(new water(Number(cleanliness)));
  }
  
  for(let i = 0; i < M; i++) {
    const pipeInput = input[i + 2].split(' ').map(v => Number(v) - 1);
    waters[pipeInput[0]].pipe.push(pipeInput[1]);
    waters[pipeInput[1]].pipe.push(pipeInput[0]);
  }
}

// 그래프 순환을 통해서 1인지 0인지 확인해주기
const dfs = (start) => {
  let status = [0, 0];
  let stack = [start];
  let route = [start];
  let result = 0;

  waters[start].visited = 1;
  status[Number(waters[start].cleanliness)]++;

  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    let isFind = false;

    for(next of waters[top].pipe) {
      if(waters[Number(next)].visited === 0) {
        waters[Number(next)].visited = 1;
        status[Number(waters[Number(next)].cleanliness)]++;

        stack.push(Number(next));
        route.push(Number(next));

        isFind = true;
        break;
      }
    }

    if(!isFind) {
      waters[top].visited = 2;
      stack.pop();
    }
  }

  result = (status[0] < status[1]) ? 1 : 0;

  for(let node of route) {
    isClean[Number(node)] = result;
  }
}

initWaterTank();

for(let i = 0; i < Q; i++) {
  let result = '';
  const waterInput = Number(input[i + 2 + M]) - 1;

  if(waters[waterInput].visited === 2) {
    result += isClean[waterInput];
  } else {
    dfs(waterInput); 
    result += isClean[waterInput];
  }

  output += (i < Q - 1) ? result + '\n' : result;
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ