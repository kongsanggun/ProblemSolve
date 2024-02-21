// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1022번
// 소용돌이 예쁘게 출력하기

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

const inputs = input[0].split(' ');
const result = [];
let maxNumber = 0;

const findNumber = (row, col) => {
  if(row === 0 && col === 0) {
    return 1;
  }

  const maxParam = Math.max(Math.abs(row), Math.abs(col));
  const powNumber = maxParam * 2 - 1;
  let plus = 0;

  const overZeroRow = row > 0;
  const overZeroCol = col > 0;

  if(Math.abs(row) > Math.abs(col)) {
    if(overZeroRow) {
      plus = (6 * maxParam) + col + row; // 4
    } else {
      plus = (2 * maxParam) + Math.abs(row) - col; // 2
    }
  } else if(Math.abs(row) < Math.abs(col)) {
    if(overZeroCol) {
      plus = col - row; // 1
    } else {
      plus = (4 * maxParam) + Math.abs(col) + row; // 3
    }
  } else {
    if(overZeroRow && overZeroCol) {
      plus = 8 * maxParam;
    } else if(overZeroRow) {
      plus = 6 * maxParam;
    } else if(overZeroCol) {
      plus = 2 * maxParam;
    } else {
      plus = 4 * maxParam;
    }
  }

  return (Math.pow(powNumber, 2) + plus);
}

for(let row = Number(inputs[0]); row <= Number(inputs[2]); row++) {
  const tmp = [];
  for(let col = Number(inputs[1]); col <= Number(inputs[3]); col++) {
    const number = findNumber(row, col);
    maxNumber = Math.max(maxNumber, number);
    tmp.push(number + '');
  }
  result.push(tmp);
}

maxNumber = maxNumber + '';

for(let row in result) {
  for(let col in result[row]) {
    result[row][col] = result[row][col].padStart(maxNumber.length, ' ');
  }
  output += result[row].join(' ');
  if(Number(row) !== result.length - 1) {
    output += '\n';
  }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ