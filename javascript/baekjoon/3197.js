// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 3197번 : 백조의 호수
// BFS + 분리 집합 

let input = require("fs").readFileSync("input.txt").toString().split("\n")
let output = 9876543210

class Lake {
  constructor(value) {
    this.value = value
    this.isVisited = false;
    this.count = 0;
  }
}

let lake = []         // 강
const lakeStack = []  // 조회 스택

let group = []; // 분리 집합
let target = []; // 백조 그룹 

const [R, C] = input[0].split(" ").map((v) => {return Number(v);})

for(let i = 0 ; i < R; i++) {
  const lakeInput = []
  const inputLine = input[1 + i].split('')
  
  for(let value of inputLine) {
    lakeInput.push(new Lake(value))
  }

  lake.push(lakeInput)
}

const initBFS = (start, group) => {
  const stack = [[...start]];

  while(stack.length > 0) {
    const top = stack.pop();
    let count = 0;

    const nextRow = [top[0] + 1, top[0] - 1, top[0], top[0]];
    const nextCol = [top[1], top[1], top[1] + 1, top[1] - 1];

    for(let i = 0; i < 4; i++) {
      if(nextRow[i] < 0 || nextRow[i] >= R || nextCol[i] < 0 || nextCol[i] >= C) {
        continue;
      }

      if(lake[nextRow[i]][nextCol[i]].value === '.' && !lake[nextRow[i]][nextCol[i]].isVisited) {
        stack.push([nextRow[i], nextCol[i]])
        lake[nextRow[i]][nextCol[i]].value = group
        lake[nextRow[i]][nextCol[i]].isVisited = true
      } else if(lake[nextRow[i]][nextCol[i]].value === 'X') {
        count += 1;
      } else if (lake[nextRow[i]][nextCol[i]].value === 'L' && !lake[nextRow[i]][nextCol[i]].isVisited) {
        target.push(group)
        stack.push([nextRow[i], nextCol[i]])
        lake[nextRow[i]][nextCol[i]].value = group
        lake[nextRow[i]][nextCol[i]].isVisited = true
      }
    }

    if(count > 0) {
      lakeStack.push([...top, group, 0]);
    }
  }
}

const find = (x) => {
  if(group[x] === x) return x;
  return find(group[x])
}

const union = (a, b) => {
  if(a > b) group[a] = b;
  else group[b] = a;
}

// 1. BFS용 스택 구하기
let groupIndex = 0;

for(let row = 0 ; row < R; row++) {
  for(let col = 0; col < C; col++) {
    if(lake[row][col].value !== 'X' && !lake[row][col].isVisited) {
      if(lake[row][col].value === 'L') {
        target.push(groupIndex)
      }
      lake[row][col].value = groupIndex
      lake[row][col].isVisited = true
      initBFS([row, col], groupIndex)
      
      group.push(groupIndex)
      groupIndex += 1;
    }
  }
}

if(target[0] !== target[1]) {
  let stackIndex = 0;
  while(lakeStack.length > stackIndex && find(target[0]) !== find(target[1])) {
    const top = lakeStack[stackIndex]; // [row, col, group, count]

    // 시간 구하기
    const nextRow = [top[0] + 1, top[0] - 1, top[0], top[0]];
    const nextCol = [top[1], top[1], top[1] + 1, top[1] - 1];

    for(let i = 0; i < 4; i++) {
      if(nextRow[i] < 0 || nextRow[i] >= R || nextCol[i] < 0 || nextCol[i] >= C) {
        continue;
      }

      if(lake[nextRow[i]][nextCol[i]].value === 'X' && !lake[nextRow[i]][nextCol[i]].isVisited) {
        lakeStack.push([nextRow[i], nextCol[i], top[2], top[3] + 1])
        lake[nextRow[i]][nextCol[i]].value = top[2]
        lake[nextRow[i]][nextCol[i]].isVisited = true
        lake[nextRow[i]][nextCol[i]].count = top[3] + 1
      } else if(lake[nextRow[i]][nextCol[i]].value != top[2]) {
        const groupA = find(lake[nextRow[i]][nextCol[i]].value)
        const groupB = find(top[2])

        union(groupA, groupB);
        if(find(target[0]) === find(target[1])) {
          output = Math.max(lake[nextRow[i]][nextCol[i]].count, top[3])
        }
      }
    }
    stackIndex += 1;
  }
} else {
  output = 0;
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ