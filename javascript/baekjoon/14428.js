// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 14428번
// 수열과 쿼리 16

// 세그먼트 트리
class segmentTree {
  constructor(N) {
    this.value = this.initTree(N)
  }

  compareValue = (a, b) => {
    let result = a
    if(result[0] > b[0]) {
      result = b
    } else if(result[0] === b[0] && result[1] > b[1]) {
      result = b
    }
    return result;
  }

  initTree = (N) => {
    let result = Array(N * 4).fill([0, 1]);
    return result;
  }

  updateTree = (value, index, target, start, end) => {
    if(start > end || start > target || end < target) {
      return;
    }
    if(start === target && end === target) {
      this.value[index] = [value, target] 
      return;
    }

    const mid = Math.floor((start + end) / 2)
    this.updateTree(value, index * 2, target, start, mid)
    this.updateTree(value, index * 2 + 1, target, mid + 1, end)

    let updateValue = this.compareValue(this.value[index * 2], this.value[index * 2 + 1])
    this.value[index] = updateValue
  }

  printTree = (index, left, right, start, end) => {
    if(start > end || start > right || end < left) {
      return null;
    }
    if(start >= left && end <= right) {
      return this.value[index];
    }

    let result = null
    const mid = Math.floor((start + end) / 2)
    const leftResult = this.printTree(index * 2, left, right, start, mid)
    const rightResult = this.printTree(index * 2 + 1, left, right, mid + 1, end)

    if(leftResult !== null && rightResult !== null) {
      result = this.compareValue(leftResult, rightResult)
    } else if(leftResult !== null) {
      result = leftResult
    } else if(rightResult !== null) {
      result = rightResult
    }

    return result;
  }
}

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

let N = Number(input[0])
let M = Number(input[2])

let tree = new segmentTree(N);

let A = input[1].split(' ').map((v) => {return Number(v)})
for(let i = 0; i < A.length; i++) {
  const treeInput = A[i]
  tree.updateTree(treeInput, 1, i + 1, 1, N)
}

for(let i = 0; i < M; i++) {
  const queryInput = input[3 + i].split(' ').map((v) => {return Number(v)})
  switch(queryInput[0]) {
    case 1:
      tree.updateTree(queryInput[2], 1, queryInput[1], 1, N)
      break;
    case 2:
      const result = tree.printTree(1, queryInput[1], queryInput[2], 1, N)
      output += result[1]
      if(i !== M - 1) {
        output += '\n';
      }
      break;
  }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ