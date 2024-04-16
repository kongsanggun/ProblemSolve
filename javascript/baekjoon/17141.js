// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 17141번
// 연구소 2

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 25000;

let firstLine = input[0].split(' ').map((v) => {return Number(v)})
const N = firstLine[0]
const M = firstLine[1]

let firstMap = []
let virusList = []

let wallCount = 0;

const BFS = (list) => {
  let isVisit = Array.from(Array(N), () => Array(N).fill(false));
  let stack = []
  let stackIndex = 0

  let result = 0;

  for(let init of list) {
    stack.push([...init, 0])
    isVisit[init[0]][init[1]] = true
  }

  while(stack.length > stackIndex) {
    const top = stack[stackIndex]
    const nextRow = [1, -1, 0, 0];
    const nextCol = [0, 0, 1, -1];

    for(let next = 0; next < 4; next++) {
      const row = top[0] + nextRow[next]
      const col = top[1] + nextCol[next]

      if(row < 0 || row >= N || col < 0 || col >= N) {
        continue;
      } else {
        const isWall = (firstMap[row][col] === 1)
        const isVisited = isVisit[row][col]
  
        if(!isWall && !isVisited) {
          stack.push([row, col, top[2] + 1])
          isVisit[row][col] = true
  
          result = Math.max(result, top[2] + 1)
        }
      }
    }

    stackIndex += 1;
  }

  if(stack.length === (N * N) - wallCount) {
    output = Math.min(output, result)
  }

}

const combine = (allList, list, count) => {
  if(count === M) {
    BFS(list);
    return;
  }

  for(let index = 0; index <= allList.length - (M - count); index++) {
    combine(allList.slice(index + 1), [...list, allList[index]], count + 1)
  }
}

for(let index = 1; index <= N; index++) {
  firstMap.push(input[index].split(' ').map((v) => {return Number(v)}))
}

for(let row = 0; row < N; row++) {
  for(let col = 0; col < N; col++) {
    if(firstMap[row][col] === 2) {
      virusList.push([row, col])
    } else if (firstMap[row][col] === 1) {
      wallCount += 1
    }
  }
}

combine(virusList, [], 0)

console.log(output === 25000 ? -1 : output);