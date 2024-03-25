// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 6087번
// 레이저 통신

let input = require('fs').readFileSync('input.txt').toString().split('\n');

const firstLine = input[0].split(' ').map(v => Number(v))
const W = firstLine[0]
const H = firstLine[1]

const graph = Array.from(Array(H), () => Array(W).fill(''));
const start = []; // 시작점
const end = []; // 종료점

const visited = Array.from(Array(H), () => Array(W).fill(Infinity));

const bfs = (start) => {
  const queue = [];
  let top = 0;

  visited[start[0]][start[1]] = 0;

  // init queue
  for(let dir = 0; dir < 2; dir++) {
    let add = 1 * Math.pow(-1, dir)
    while(start[0] + add >= 0 && start[0] + add < H) {
      if(graph[start[0] + add][start[1]] === '*') {
        break;
      }

      visited[start[0] + add][start[1]] = 0;
      queue.push([[start[0] + add, start[1]], 0])

      add = add + 1 * Math.pow(-1, dir)
    }

    add = 1 * Math.pow(-1, dir)
    while(start[1] + add >= 0 && start[1] + add < W) {
      if(graph[start[0]][start[1] + add] === '*') {
        break;
      }

      visited[start[0]][start[1] + add] = 0;
      queue.push([[start[0], start[1] + add], 0])

      add = add + 1 * Math.pow(-1, dir)
    }
  }

  // roop queue
  while(queue.length > top) {
    topNode = queue[top];
    location = topNode[0];
    count = topNode[1] + 1;

    for(let dir = 0; dir < 2; dir++) {
      let add = 1 * Math.pow(-1, dir)
      while(location[0] + add >= 0 && location[0] + add < H) {
        if(graph[location[0] + add][location[1]] === '*') {
          break;
        }
        if(visited[location[0] + add][location[1]] > count) {
          visited[location[0] + add][location[1]] = count;
          queue.push([[location[0] + add, location[1]], count])
        }
  
        add = add + 1 * Math.pow(-1, dir)
      }
  
      add = 1 * Math.pow(-1, dir)
      while(location[1] + add >= 0 && location[1] + add < W) {
        if(graph[location[0]][location[1] + add] === '*') {
          break;
        }
        if(visited[location[0]][location[1] + add] > count) {
          visited[location[0]][location[1] + add] = count;
          queue.push([[location[0], location[1] + add], count])
        }
  
        add = add + 1 * Math.pow(-1, dir)
      }
    }

    top = top + 1;
  }
}

for (let row = 0; row < H; row++) {
  let colInput = input[row + 1];
  for(let col = 0; col < W; col++) {
    graph[row][col] = colInput[col]
    if(colInput[col] === 'C' && start.length === 0) {
      start.push(row)
      start.push(col)
    }
    else if(colInput[col] === 'C') {
      end.push(row)
      end.push(col)
    }
  }
}

bfs(start)

console.log(visited[end[0]][end[1]]); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ