// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 17404 : RGB거리 2
// DP

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = Infinity;

let n = Number(input[0]);
let cost = [];
let dp = [];

for (let i = 0; i < n; i++) {
  const inputLine = input[i + 1].split(" ").map((value) => {
    return Number(value);
  });
  cost.push(inputLine);
}

for (start = 0; start < 3; start++) {
  dp = Array(n)
    .fill(0)
    .map(() => new Array(3).fill(Infinity));

  dp[0][start] = cost[0][start];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      if (i == n - 1 && j === start) {
        continue;
      }

      dp[i][j] = cost[i][j];
      dp[i][j] =
        dp[i][j] + Math.min(dp[i - 1][(j + 1) % 3], dp[i - 1][(j + 2) % 3]);
    }
  }

  output = Math.min(output, ...dp[n - 1]);
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ