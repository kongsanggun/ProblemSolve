// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 23040번
// 누텔라 (Easy)

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n');
let output = 0;
const N = Number(input[0]);

let nutalla = [null];

class node {
  constructor() {
    this.visited = false;
    this.color = null;
    this.edge = [];
  }
}

const search = (start) => {
  let topIndex = 0;
  let black = 0;
  let stack = [start];
  nutalla[start].visited = true;

  while(stack.length > topIndex) {
    const top = stack[topIndex];
    topIndex = topIndex + 1;

    for(next of nutalla[top].edge) {
      if(nutalla[Number(next)].color !== 'B') {
        if(!nutalla[Number(next)].visited) {
          stack.push(Number(next));
          nutalla[Number(next)].visited = true;
        } 
      } else {
        black = black + 1
      }
    }
  }

  return stack.length * black;
}

for(let index = 0; index < N; index++) {
  nutalla.push(new node())
}

for(let index = 1; index < N; index++) {
  const edge = input[index].split(' ').map(v => {return Number(v)});
  const a = edge[0];
  const b = edge[1];

  nutalla[a].edge.push(b);
  nutalla[b].edge.push(a);
}

colors = input[N].trim()
for (let index in colors) {
  const color = colors[Number(index)];
  nutalla[Number(index) + 1].color = color
}

for (let index = 1; index <= N; index++) {
  const color = nutalla[index].color 
  const visited = nutalla[index].visited 
  if(color !== 'B' && !(visited)) {
    output = output + search(index)
  }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ