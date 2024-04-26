// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 21939번 : 문제 추천 시스템 Version 1

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

const N = Number(input[0]);
const M = Number(input[N + 1]);

let problemList = {};
let problemObject = {};

for (let index = 1; index <= N; index++) {
  const [problem, level] = input[index].split(" ").map((v) => {
    return Number(v);
  });

  problemList[problem] = level;
  if (problemObject[level] === undefined) {
    problemObject[level] = [problem];
  } else {
    problemObject[level].push(problem);
  }
}

let keys = Object.keys(problemObject);

for (let index = 0; index < M; index++) {
  const commandInput = input[index + N + 2].split(" ");
  if (commandInput[0] === "recommend") {
    const x = Number(commandInput[1]);
    keys = Object.keys(problemObject);
    if (x === 1) {
      const keyLast = keys.length - 1;
      const problemLast = problemObject[keys[keyLast]].length - 1;

      problemObject[keys[keyLast]] = problemObject[keys[keyLast]].sort(
        (a, b) => {
          return a - b;
        },
      );
      output.push(problemObject[keys[keyLast]][problemLast]);
    } else {
      problemObject[keys[0]] = problemObject[keys[0]].sort((a, b) => {
        return a - b;
      });
      output.push(problemObject[keys[0]][0]);
    }
  } else if (commandInput[0] === "add") {
    const P = Number(commandInput[1]);
    const L = Number(commandInput[2]);

    problemList[P] = L;
    if (problemObject[L] === undefined) {
      problemObject[L] = [P];
    } else {
      problemObject[L].push(P);
    }
  } else {
    const P = Number(commandInput[1]);

    if (problemObject[problemList[P]].length === 1) {
      delete problemObject[problemList[P]];
    } else {
      problemObject[problemList[P]] = problemObject[problemList[P]].filter(
        (v) => {
          return v !== P;
        },
      );
    }

    delete problemList[P];
  }
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋㅋ