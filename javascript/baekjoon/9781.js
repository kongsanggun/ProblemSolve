// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 9781번 : Knight Moves

let input = require('fs').readFileSync("input.txt").toString().split('\n')
let output = -1;

const [m, n] = input[0].split(' ').map((v) => {return Number(v);})

let map = [];
let isVisited = [];
let queue = [];

for(let row = 1; row <= m; row++) {
  let visitedList = [];

  for(let col = 0; col < n; col++) {
    if(input[row][col] === 'K') {
      queue.push([row - 1, col, 0])
    }
    visitedList.push(false);
  }

  map.push(input[row]);
  isVisited.push(visitedList);
}

isVisited[queue[0][0]][queue[0][1]] = true;

while(queue.length > 0) {
  const [row, col, count] = queue[0];

  if(map[row][col] === 'X') {
    output = count;
    break;
  }

  const nextRow = [row - 2, row - 2, row - 1, row - 1, row + 1, row + 1, row + 2, row + 2];
  const nextCol = [col - 1, col + 1, col - 2, col + 2, col - 2, col + 2, col - 1, col + 1];

  for(let i = 0; i < 8; i++) {
    if(nextRow[i] < 0 || nextRow[i] >= m) {
      continue;
    }

    if(nextCol[i] < 0 || nextCol[i] >= n) {
      continue;
    }

    if(isVisited[nextRow[i]][nextCol[i]] || map[nextRow[i]][nextCol[i]] === '#') {
      continue;
    }

    isVisited[nextRow[i]][nextCol[i]] = true;
    queue.push([nextRow[i], nextCol[i], count + 1])
  }

  queue = queue.slice(1)
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ