// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 13269번
// 쌓기나무

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let firstInput = input[0].split(' ').map((v) => {return Number(v)});
let output = []
let isPossable = true

const N = firstInput[0]
const M = firstInput[1]

let blockTop = []
let blockSide = []
let blockFront = []

let dpFront = Array(M).fill(0)

for(let i = 1; i <= N; i++) {
  const inputTop = input[i].split(' ').map((v) => {return Number(v)});
  blockTop.push(inputTop)
}

blockFront = input[N + 1].split(' ').map((v) => {return Number(v)});
blockSide = input[N + 2].split(' ').map((v) => {return Number(v)});

blockSide = blockSide.reverse()

for(let i = 0; i < N; i++) {
  for(let j = 0; j < M ; j++) {
    const min = Math.min(blockFront[j], blockSide[i])
    if(blockTop[i][j] === 1) {
      blockTop[i][j] = min
      dpFront[j] = Math.max(dpFront[j], min)
    }
  }

  if(Math.max(...blockTop[i]) !== blockSide[i]) {
    isPossable = false
  }
}

for(let i = 0; i < M; i++) {
  if(dpFront[i] !== blockFront[i]) {
    isPossable = false
  }
}

if(isPossable) {
  for(let i = 0; i < blockTop.length; i++) {
    output.push(blockTop[i].join(' '))
  }
  console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
} else {
  console.log(-1);
}