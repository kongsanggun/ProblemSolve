// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 20188번
// 등산마니아
// 트리 DP + DFS

class treeNode {
  constructor() {
    this.edge = [];
    this.visited = false;
    this.dp = 1;
  }
}

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = 0;

const N = Number(input[0]);
const tree = Array(N + 1);

const initTree = (index) => {
  if(tree[index] === null || tree[index] === undefined) {
    tree[index] = new treeNode();
  }
}

const dfs = (node) => {
  tree[node].visited = true;

  for(let next of tree[node].edge) {
    if(!tree[next].visited) {
      tree[node].dp += dfs(next);
    }
  }

  if(node !== 1) {
    const tmp  = N - tree[node].dp;
    output += (N * (N - 1) / 2) - (tmp * (tmp - 1) / 2);
  }
  
  return tree[node].dp
}

for(let index = 1; index < N; index++) {
  const road = input[index].split(' ').map((v) => {return Number(v)});
  initTree(road[0]);
  initTree(road[1]);
  tree[road[0]].edge.push(road[1]);
  tree[road[1]].edge.push(road[0]);
}

dfs(1);

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ