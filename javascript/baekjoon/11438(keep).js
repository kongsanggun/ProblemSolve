// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 11438번 : LCA 2

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

class node {
  constructor() {
    this.edge = [];
    this.parent = null;
    this.level = 1;
  }
}

const N = Number(input[0]);
const M = Number(input[N]);

let tree = Array.from(Array(N + 1), () => new node()); // 트리
let table = Array.from(Array(Math.ceil(Math.log2(N)) + 1), () =>
  Array(N + 1).fill(0),
); // 희소 배열

for (let index = 1; index < N; index++) {
  const inputLine = input[index].split(" ").map((v) => {
    return Number(v);
  });

  tree[inputLine[0]].edge.push(inputLine[1]);
  tree[inputLine[1]].edge.push(inputLine[0]);
}

// 트리 정리하기
let queue = [1];
let queueIndex = 0;
tree[1].parent = 1;

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

// 배열 정리하기
for (let col = 1; col <= N; col++) {
  table[0][col] = col;
}

for (let row = 1; row < table.length; row++) {
  for (let col = 1; col <= N; col++) {
    if (row === 1) {
      table[row][col] = tree[col].parent;
    } else {
      table[row][col] = table[row - 1][table[row - 1][col]];
    }
  }
}

for (let index = N + 1; index <= N + M; index++) {
  const inputLine = input[index].split(" ").map((v) => {
    return Number(v);
  });

  let A = inputLine[0];
  let B = inputLine[1];

  if (tree[A].level > tree[B].level) {
    let dif = tree[A].level - tree[B].level;
    let binary = "";

    while (dif > 0) {
      binary += dif % 2;
      dif = Math.floor(dif / 2);
    }

    for (let index in binary) {
      if (binary[index] === "1") {
        A = table[Number(index) + 1][A];
      }
    }
  } else if (tree[A].level < tree[B].level) {
    let dif = tree[B].level - tree[A].level;
    let binary = "";

    while (dif > 0) {
      binary += dif % 2;
      dif = Math.floor(dif / 2);
    }

    for (let index in binary) {
      if (binary[index] === "1") {
        B = table[Number(index) + 1][B];
      }
    }
  }

  // TODO : 시간복잡도 최적화
  while (A != B) {
    A = tree[A].parent;
    B = tree[B].parent;
  }

  output.push(A);
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ