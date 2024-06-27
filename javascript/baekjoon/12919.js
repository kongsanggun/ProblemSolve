// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 12919번 : A와 B 2

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = false;

const S = input[0];
let T = input[1];

const isPossable = (word, size) => {
  let result = false;

  if (size === S.length && S === word) {
    return true;
  } else if (size === S.length) {
    return false;
  }
  
  if (word[size - 1] === "A") {
    const tmp = [...word].join("");
    result = isPossable(tmp.slice(0, -1), size - 1);
  } 
  
  if (word[0] === "B" && !result) {
    const tmp = [...word].reverse().join("");
    result = isPossable(tmp.slice(0, -1), size - 1);
  }

  return result;
};

output = isPossable(T, T.length);

console.log(output ? 1 : 0); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ