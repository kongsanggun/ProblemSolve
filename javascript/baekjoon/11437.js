// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 11437번 : LCA

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

class node {
  constructor() {
    this.edge = [];
    this.parent = null;
    this.level = 0;
  }
}

let N = Number(input[0]);
let M = Number(input[N]);

let tree = Array.from(Array(N + 1), () => new node());

for (let index = 1; index < N; index++) {
  const inputLine = input[index].split(" ").map((v) => {
    return Number(v);
  });

  tree[inputLine[0]].edge.push(inputLine[1]);
  tree[inputLine[1]].edge.push(inputLine[0]);
}

let queue = [1];
let queueIndex = 0;

tree[1].parent = 0;
tree[1].level = 0;

while (queue.length > queueIndex) {
  const top = queue[queueIndex];

  for (let next of tree[top].edge) {
    if (tree[Number(next)].parent === null) {
      queue.push(Number(next));
      tree[Number(next)].parent = top;
      tree[Number(next)].level = tree[top].level + 1;
    }
  }

  queueIndex += 1;
}

for (let index = N + 1; index <= N + M; index++) {
  const inputLine = input[index].split(" ").map((v) => {
    return Number(v);
  });

  const A = tree[inputLine[0]];
  const B = tree[inputLine[1]];

  let compareCount = Math.max(A.level, B.level);
  let compareA = inputLine[0];
  let compareB = inputLine[1];

  while (compareA !== compareB) {
    if (compareCount <= A.level) {
      compareA = tree[compareA].parent;
    }

    if (compareCount <= B.level) {
      compareB = tree[compareB].parent;
    }

    compareCount -= 1;
  }

  output.push(compareA);
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ