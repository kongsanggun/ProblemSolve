// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 25601번
// 자바의 형변환

class treeNode{
  constructor() {
    this.child = [];
  }
}

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 0;

const N = Number(input[0]);
let tree = {};

for(let i = 1; i < N; i++) {
  const inputLine = input[i].split(' ')
  const A = inputLine[0];
  const B = inputLine[1];

  if(tree[B] === undefined) {
    tree[B] = new treeNode();
  }

  tree[B].child.push(A);
}

const outputLine = input[N].split(' ')

let stack = []
let stackTop = 0;
if(tree[outputLine[0]] !== undefined) {
  stack.push(outputLine[0])
}

while(stack.length > stackTop) {
  const top = stack[stackTop]
  for(let next of tree[top].child) {
    if(next === outputLine[1]) {
      output = 1
    }
    if(tree[next] !== undefined) {
      stack.push(next)
    }
  }
  stackTop += 1
}

stack = []
stackTop = 0;
if(tree[outputLine[1]] !== undefined) {
  stack.push(outputLine[1])
}

while(stack.length > stackTop) {
  const top = stack[stackTop]
  for(let next of tree[top].child) {
    if(next === outputLine[0]) {
      output = 1
    }
    if(tree[next] !== undefined) {
      stack.push(next)
    }
  }
  stackTop += 1
}

console.log(output);