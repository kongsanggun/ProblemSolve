// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 13913번
// 숨박꼭질 4
// BFS

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";
let result = [];

const firstLine = input[0].split(' ').map(value => Number(value));
const N = firstLine[0];
const K = firstLine[1];

let visit = []; // 조회 여부확인
let queue = [ [0, N, N + ''] ]; // BFS 조회용 큐
let top = 0;

visit[N] = true;

while(true) {
  let node = queue[top];
  let cur = node[1];
  let isbreak = false;
  let next = [cur + 1, cur - 1, cur * 2];

  if(cur === K) {
    result = node;
    break;
  }

  for (let nextNode of next) {
    const isRange = nextNode <= 100000 && nextNode >= 0;
    if (visit[nextNode] !== true && isRange) {
      if (nextNode === K) {
        result = [node[0] + 1, nextNode, node[2] + " " + nextNode];
        isbreak = true;
      } else {
        queue.push([node[0] + 1, nextNode, node[2] + " " + nextNode]);
        visit[nextNode] = true;
      }
    }
  }

  if(isbreak) {
    break;
  }

  top++;
}

output += (result[0] + "\n");
output += result[2];

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ