// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 10868번 : 최솟값
// 희소 배열

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

let firstLine = input[0].split(" ").map((v) => {
  return Number(v);
});
let N = firstLine[0];
let M = firstLine[1];

let table = Array.from(Array(Math.ceil(Math.log2(N)) + 1), () =>
  Array(N + 1).fill(0),
); // 희소 배열

for (let index = 1; index <= N; index++) {
  table[0][index] = Number(input[index]);
}

for (let row = 1; row < table.length; row++) {
  for (let col = 1; col <= N - Math.pow(2, row - 1); col++) {
    if (row === 1) {
      table[row][col] = Math.min(table[row - 1][col], table[row - 1][col + 1]);
    } else {
      table[row][col] = Math.min(
        table[row - 1][col],
        table[row - 1][col + Math.pow(2, row - 2)],
      );
    }
  }
}

for (let index = N + 1; index <= N + M; index++) {
  const inputLine = input[index].split(" ").map((v) => {
    return Number(v);
  });

  let start = Math.min(inputLine[0], inputLine[1]);
  let result = table[0][start];

  let dif = Math.abs(inputLine[0] - inputLine[1]);
  let binary = "";

  while (dif > 0) {
    binary += dif % 2;
    dif = Math.floor(dif / 2);
  }

  let pows = 1;
  for (let index in binary) {
    if (binary[index] === "1") {
      result = Math.min(result, table[Number(index) + 1][start]);
      start = start + pows;
    }
    pows *= 2;
  }

  output.push(result);
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ