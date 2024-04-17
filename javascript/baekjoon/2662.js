// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2662번 : 기업투자

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = []

let [ N, M ] = input[0].split(' ').map((v) => {return Number(v)})
let cost = [Array(M).fill(0)]

let dp = Array.from(Array(M), () => Array(N + 1).fill([0, []]));

for(let index = 1; index <= N; index++) {
  let costInput = input[index].split(' ').map((v) => {return Number(v)}).slice(1)
  cost.push(costInput)
}

for(let index = 0; index <= N; index++) {
  dp[0][index] = [cost[index][0], [index]]
}

for(let row = 1; row < M; row++) {
  for(let col = 1; col <= N; col++) {

    for(let sumCost = 0; sumCost <= col; sumCost++) {
      const A = dp[row][col][0]
      const B = dp[row - 1][sumCost][0] + cost[col - sumCost][row]

      if(A < B) {
        dp[row][col] = [B, [...dp[row - 1][sumCost][1], col - sumCost]]
      }
    }

  }
}

output.push(dp[M - 1][N][0])
output.push(dp[M - 1][N][1].join(' '))

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ