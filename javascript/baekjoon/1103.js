// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1103번 : 게임
// DFS + DP

let input = require("fs").readFileSync("input.txt").toString().split("\n");

let [N, M] = input[0].split(' ').map((v) => {
  return Number(v)
})

let map = [];
for(let index = 1; index <= N; index++) {
  const mapInput = input[index].split('')
  map.push(mapInput)
}

let isVisited = Array.from(Array(N), () => {
  return Array(M).fill(false) 
})

let dp = Array.from(Array(N), () => {
  return Array(M).fill(1) 
})

let isRoop = false;
let stack = [[0, 0, 0]];

const dfs = () => {
  const [R, C, moveCount] = stack[stack.length - 1]
  const X = Number(map[R][C])
  const next = [[R + X, C], [R - X, C], [R, C + X], [R, C - X]]

  isVisited[R][C] = true

  for(let [nextR, nextC] of next) {
    if(nextR < 0 || nextR >= N || nextC < 0 || nextC >= M) {
      continue;
    }
    if(map[nextR][nextC] === 'H') {
      continue;
    }

    if(isVisited[nextR][nextC] || isRoop) {
      isRoop = true;
      return;
    }

    if(dp[nextR][nextC] === 1) {
      stack.push([nextR, nextC, moveCount + 1]);
      dfs()
    }

    dp[R][C] = Math.max(dp[R][C], dp[nextR][nextC] + 1);
  }

  stack.pop()
  isVisited[R][C] = false
}

dfs();
console.log(isRoop ? -1 : dp[0][0]); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ