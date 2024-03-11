// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 28291번
// 레드스톤

// 모든 회로 블록은 여러 번 행동할 수 있으며, 모두 동시에 행동한다.
// 모든 레드스톤 램프가 켜지는 순간이 있는지 확인

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 0;
let lampCount = 0;

const firstInput = input[0].split(" ").map((value) => Number(value));
const W = firstInput[0]; // 가로 길이
const H = firstInput[1]; // 세로 길이
const N = Number(input[1]);

let redStone = Array.from(new Array(H), () => new Array(W).fill(0));
let visited = Array.from(new Array(H), () => new Array(W).fill(false));

let bfs = [];
let frontIndex = 0;

// 순회용 그래프 구현하기
for (let index = 0; index < N; index++) {
  const command = input[index + 2].split(" ");
  switch (command[0]) {
    case "redstone_block":
      // 레드스톤 블록
      redStone[Number(command[2])][Number(command[1])] = 1;
      bfs.push([Number(command[2]), Number(command[1]), 16]);
      visited[Number(command[2])][Number(command[1])] = true;
      break;
    case "redstone_dust":
      // 레드스톤 가루
      redStone[Number(command[2])][Number(command[1])] = 2;
      break;
    case "redstone_lamp":
      // 레드스톤 램프
      redStone[Number(command[2])][Number(command[1])] = 3;
      lampCount++;
      break;
    default:
      break;
  }
}

// BFS 이용
while (bfs.length > frontIndex) {
  const row = [-1, 1, 0, 0];
  const col = [0, 0, -1, 1];
  const top = bfs[frontIndex];

  if (top[2] > 1) {
    for (let index = 0; index < 4; index++) {
      const nextRow = top[0] + row[index];
      const nextCol = top[1] + col[index];

      const isRanged =
        nextRow >= 0 && nextRow < H && nextCol >= 0 && nextCol < W;

      if (!isRanged) {
        continue;
      }

      const isDust =
        !visited[nextRow][nextCol] && redStone[nextRow][nextCol] === 2;
      const isLamp =
        !visited[nextRow][nextCol] && redStone[nextRow][nextCol] === 3;

      if (isDust) {
        bfs.push([nextRow, nextCol, top[2] - 1]);
        visited[nextRow][nextCol] = true;
      }

      if (isLamp) {
        output++;
        visited[nextRow][nextCol] = true;
      }
    }
  }

  frontIndex++;
}

// 불이 켜졌는지 확인
console.log(lampCount === output ? "success" : "failed"); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ