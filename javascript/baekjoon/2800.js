// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
2800번 괄호 제거 [자료구조]

어떤 수식이 주어 졌을 때, '괄호를 제거해서 나올 수 있는' 서로 다른 식의 개수를 계산하는 프로그램 작성
*/

let input = require("fs").readFileSync("input.txt").toString().trim(); // 테스트
let output = "";

let stack = []; // 괄호 스택용
let bracket = []; // 괄호 저장용
let result = new Set(); // * Set은 Array와 달리 중복을 허용하지 않는다.
let write = new Array(input.length).fill(true);

const dfs = (idx, cnt) => {
  if (idx === bracket.length) {
    if (cnt > 0) {
      let temp = "";

      for (let i = 0; i < input.length; i++) {
        if (write[i]) {temp += input[i]}
      }

      result.add(temp);
    }
    return;
  }
  const from = bracket[idx][0];
  const to = bracket[idx][1];

  dfs(idx + 1, cnt); // 들어가지 않음

  write[from] = false;
  write[to] = false;
  dfs(idx + 1, cnt + 1); // 들어감

  write[from] = true;
  write[to] = true;
};

for (let index = 0; index < input.length; index++) {
  const element = input[index];
  if (element === "(") {
    stack.push(index);
  } else if (element === ")") {
    const from = stack.pop();
    bracket.push([from, index]);
  }
}

dfs(0, 0, ""); // * 수식 담기 dfs 이용 (제일 중요 파트)

[...result].sort().forEach((element, index) => {
    output += element;
    if (index !== [...result].length - 1) {
        output += "\n";
    }
}) // 출력 

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
