// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 5430번 : AC

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

const T = Number(input[0]);

for (let test = 0; test < T; test++) {
  const P = [...input[1 + test * 3]];
  const N = Number(input[2 + test * 3]);
  const X = input[3 + test * 3]
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map((v) => {
      return Number(v);
    });

  if (X[0] === 0) {
    X.pop();
  }

  let isReverse = false;
  let start = 0;
  let end = N;

  for (let command of P) {
    if (command === "R") {
      isReverse = !isReverse;
    } else if (isReverse) {
      end -= 1;
    } else {
      start += 1;
    }
  }
  
  if (start > end) {
    output.push("error");
  } else {
    let result = X.slice(start, end);
    if (isReverse) {
      result = result.reverse();
    }
    output.push("[" + result.join(",") + "]");
  }

}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ