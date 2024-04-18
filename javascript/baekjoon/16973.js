// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 16973번 : 직사각형 탈출

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 0;

let [N, M] = input[0].split(' ').map((v) => {
  return Number(v)
})
output = N * M + 1;

let map = [];
for(let index = 1; index <= N; index++) {
  const mapInput = input[index].split(' ').map((v) => {
    return Number(v);
  })
  map.push(mapInput)
}

let mapSum = Array.from(Array(N + 1), () => {
  return Array(M + 1).fill(0)
});

for(let row = 1; row < N + 1; row++) {
  for(let col = 1; col < M + 1; col++) {
    mapSum[row][col] = mapSum[row][col - 1] + mapSum[row][col];
    mapSum[row][col] = mapSum[row - 1][col] + mapSum[row][col];
    mapSum[row][col] = mapSum[row][col] - mapSum[row - 1][col - 1];

    mapSum[row][col] = map[row - 1][col - 1] + mapSum[row][col];
  }
}

let mapVisited = Array.from(Array(N), () => {
  return Array(M).fill(false)
});

const [H, W, sr, sc, fr, fc] = input[N + 1].split(' ').map((v, i) => {
  return (i < 2) ? Number(v) : Number(v) - 1
})

const stack = [[sr, sc, 0]]
mapVisited[sr][sc] = true

let stackIndex = 0;

while(stack.length > stackIndex && (stack[stackIndex][0] !== fr || stack[stackIndex][1] !== fc)) {
  const [row, col, step] = stack[stackIndex];
  const next = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]]

  for(let [nextRow, nextCol] of next) {
    if(nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= M) {
      continue;
    }
    if(nextRow + H > N || nextCol + W > M) {
      continue;
    }

    const prefixSum = mapSum[nextRow][nextCol] + mapSum[nextRow + H][nextCol + W] - mapSum[nextRow + H][nextCol] - mapSum[nextRow][nextCol + W];

    if(prefixSum === 0 && !mapVisited[nextRow][nextCol]) {
      mapVisited[nextRow][nextCol] = true
      stack.push([nextRow, nextCol, step + 1])
    }
  }

  stackIndex++;
}

console.log((stack.length === stackIndex) ? -1 : stack[stackIndex][2]); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ