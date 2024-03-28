// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1489번
// 대결
// 이길 때 2점, 비길 때 1점
// A팀이 최대로 받을 수 있는 점수

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = 0;

const N = Number(input[0]);
let scoreA = input[1].split(' ').map(v => {return Number(v)});
let scoreB = input[2].split(' ').map(v => {return Number(v)});
let dp = Array.from(Array(N), () => Array(N).fill(0));

scoreA = scoreA.sort((a, b) => {return a - b})
scoreB = scoreB.sort((a, b) => {return a - b})

const getPoint = (a, b) => {
  if(scoreA[a] > scoreB[b]) {
    return 2;
  }
  else if(scoreA[a] === scoreB[b]) {
    return 1;
  }
  else {
    return 0;
  }
} 

for(let i = 0; i < N; i++) {
  const point = getPoint(i, 0);
  dp[0][i] = [point, [i]];
}

for(let i = 1; i < N; i++) {
  for(let j = 0; j < N; j++) {
    const point = getPoint(j, i);

    for(let k = 0; k < N; k++) {
      if(dp[i- 1][k][1] === undefined) {
        continue;
      }

      if(dp[i - 1][k][1].findIndex(v => {return v === j}) !== -1) {
        continue;
      }

      const sumPoint = point + dp[i - 1][k][0]
      if(sumPoint > dp[i][j][0] || dp[i][j][0] === undefined) {
        dp[i][j] = [sumPoint, [...dp[i - 1][k][1], j]];
      }
    }
  }
}

for(let i = 0; i < N; i++) {
  if(dp[N - 1][i][0] === undefined) {
    continue;
  }
  if(output < dp[N - 1][i][0]) {
    output = dp[N - 1][i][0]
  }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ