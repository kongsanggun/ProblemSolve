// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2042번
// 구간 합 구하기
// Number 같은 경우 오버플로우가 발생할 수 있어서 BigInt을 사용

// Segment Tree
class segmentTree {
  constructor(size) {
    this.node = Array(size * 4 + 1).fill(0n);
  }

  updateTree = (value, index, target, start, end) => {
    if (start > end || start > target || end < target) {
      return;
    }

    if(start === end) {
      this.node[index] = value;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    if(target <= mid) {
      this.updateTree(value, index * 2, target, start, mid);
    } else {
      this.updateTree(value, index * 2 + 1, target, mid + 1, end);
    }

    this.node[index] = this.node[index * 2] + this.node[index * 2 + 1];
    return;
  }

  printTree = (index, left, right, start, end) => {
    if (start > end || start > right || end < left) {
      return 0n;
    }

    if(start >= left && end <= right) {
      return this.node[index];
    }

    const mid = Math.floor((start + end) / 2)
    return this.printTree(index * 2, left, right, start, mid) + this.printTree(index * 2 + 1, left, right, mid + 1, end);
  }
}

let inputs = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

const firstInput = inputs[0].split(' ').map((value) => {return Number(value);})
const N = firstInput[0]; // 배열의 갯수
const M = firstInput[1]; // 배열의 값의 변경이 일어난 횟수
const K = firstInput[2]; // 배열 구간의 합을 출력하는 횟수

const tree = new segmentTree(N);

for(let i = 1; i <= N; i++) {
  const node = BigInt(inputs[i]);
  tree.updateTree(node, 1, i, 1, N);
}

for(let i = N + 1; i <= N + M + K; i++) {
  const command = inputs[i].split(' ')
  switch(Number(command[0])) {
    case 1 :
      tree.updateTree(BigInt(command[2]), 1, Number(command[1]), 1, N);
      break;
    case 2 :
      output = output + tree.printTree(1, Number(command[1]), Number(command[2]), 1, N)
      if(i < N + M + K) {
        output = output + '\n';
      }
      break;
  }
}

console.log(output)