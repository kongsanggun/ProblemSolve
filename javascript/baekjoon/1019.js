// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1019번
// 책 페이지

let input = require("fs").readFileSync("input.txt").toString().split("\n");

let output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let digitNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 자릿수

let N = input[0].split("").reverse().join("");

for (let index = 0; index < N.length; index++) {
  const num = Number(N[index]);
  digitNumber[num] = digitNumber[num] + 1;
}

let a = [0, 1, 20, 300, 4000, 50000, 600000, 7000000, 80000000, 900000000];
let b = 1;

for (let index = 0; index < N.length; index++) {
  const num = Number(N[index]);
  digitNumber[num] = digitNumber[num] - 1;
  
  for (let jndex = 0; jndex < 10; jndex++) {
    output[jndex] = output[jndex] + (num * a[index]);
  }

  if (b === 1) {
    for (let jndex = 0; jndex <= num; jndex++) {
      output[jndex] = output[jndex] + b;
    }

    for (let jndex = 0; jndex < 10; jndex++) {
      output[jndex] = output[jndex] + digitNumber[jndex] * (num + 1);
    }
  } else {
    for (let jndex = 0; jndex < num; jndex++) {
      output[jndex] = output[jndex] + b;
    }

    for (let jndex = 0; jndex < 10; jndex++) {
      output[jndex] = output[jndex] + digitNumber[jndex] * (num * b);
    }
  }

  b = b * 10;
}

b = 0
for(let index = 0; index < N.length; index++) {
  b = b * 10 + 1;
}

output[0] = output[0] - b;

console.log(output.join(" "));