// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 11967번 : 불켜기

const visitState = {
  NONE_VISITED : 0,
  SERACHED : 1,
  VISITED : 2
}

class room{
  constructor() {
    this.switch = []
    this.isVisited = visitState.NONE_VISITED
    this.isLight = false
  }
}

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 1;

let firstLine = input[0].split(' ').map((v) => {return Number(v)})
const N = firstLine[0]
const M = firstLine[1]

let map = Array.from(Array(N + 1), () => {
  return Array.from(Array(N + 1), () => new room())
})

map[1][1].isLight = true

for(let index = 1; index <= M; index++) {
  const [x, y, a, b] = input[index].split(' ').map((v) => {return Number(v)})
  map[x][y].switch.push([a, b])
}

let stack = [[1, 1]]
let stackIndex = 0

while(stack.length > stackIndex) {
  const [row, col] = stack[stackIndex]
  map[row][col].isVisited = visitState.VISITED

  // 스택 방문의 조건 생각해오기
  for(let [a, b] of map[row][col].switch) {
    if(!map[a][b].isLight) {
      map[a][b].isLight = true
      output += 1
      if(map[a][b].isVisited === visitState.SERACHED) {
        stack.push([a, b])
      }
    }
  }

  const next = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]];
  for(let [nextRow, nextCol] of next) {
    if(nextRow <= 0 || nextRow > N || nextCol <= 0 || nextCol > N) {
      continue;
    }

    if(map[nextRow][nextCol].isVisited !== visitState.NONE_VISITED) {
      continue
    }

    if(map[nextRow][nextCol].isLight) {
      stack.push([nextRow, nextCol])
    }

    map[nextRow][nextCol].isVisited = visitState.SERACHED
  }

  stackIndex += 1
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ