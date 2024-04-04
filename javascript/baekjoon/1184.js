// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1184번
// 귀농

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 0;

const N = Number(input[0]);
let field = [];
let sumField = [];

const initSumFiled = () => {
  const firstRow = Array.from(Array(N + 1).fill(0))
  sumField.push(firstRow)

  for(let i = 0; i < N; i++) {
    let inputRow = [0]
    for(let j = 0; j < N; j++) {
      const value = field[i][j] + inputRow[inputRow.length - 1];
      inputRow.push(value)
    }
    inputRow = inputRow.map((v, i) => {return v + sumField[sumField.length - 1][i]})
    sumField.push(inputRow);
  }
}

const sum = (start, end) => {
  let result = sumField[end[0] + 1][end[1] + 1];
  result += sumField[start[0]][start[1]]
  result -= sumField[start[0]][end[1] + 1]
  result -= sumField[end[0] + 1][start[1]]
  return result
}

for(let i = 1; i <= N; i++) {
  const fieldInput = input[i].split(' ').map((v) => {return Number(v)})
  field.push(fieldInput)
}

initSumFiled();

for(let row = 0; row < N; row++) {
  for(let col = 0; col < N; col++) {
    let tmp = [];
    
    for(let i = 0; i <= row; i++) {
      for(let j = 0; j <= col; j++) {
        const value = sum([i, j], [row, col])
        if(tmp[value] === undefined) {
          tmp[value] = 1
        } else {
          tmp[value] += 1;
        }
      }
    }

    for(let i = row + 1; i < N; i++) {
      for(let j = col + 1; j < N; j++) {
        const value = sum([row + 1, col + 1], [i, j])
        if(tmp[value] !== undefined) {
          output += tmp[value]
        }
      }
    }

    tmp = [];

    for(let i = row; i < N; i++) {
      for(let j = 0; j <= col; j++) {
        const value = sum([row, j], [i, col])
        if(tmp[value] === undefined) {
          tmp[value] = 1
        } else {
          tmp[value] += 1;
        }
      }
    }

    for(let i = 0; i < row; i++) {
      for(let j = col + 1; j < N; j++) {
        const value = sum([i, col + 1], [row - 1, j])
        if(tmp[value] !== undefined) {
          output += tmp[value]
        }
      }
    }

  }
}

console.log(output);
