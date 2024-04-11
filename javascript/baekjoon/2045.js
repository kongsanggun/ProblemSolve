// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2045번
// 마방진

class line {
  constructor() {
    this.sum = 0;
    this.zeroCount = 0;
  }
}

let initList = [
  [[0, 1, 5], [2, 5], [3, 4, 5]],
  [[1, 6], [0, 2, 4, 6], [3, 6]],
  [[1, 4, 7], [2, 7], [0, 3, 7]]
]

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = [];
let maLine = [];
let sum = 0;

for(let i = 0; i < 8; i++) {
  maLine.push(new line());
}

for(let i = 0; i < 3; i++) {
  const maInput = input[i].split(' ').map((v) => {return Number(v)})
  output.push(maInput)
}

for(let i = 0; i < 3; i++) {
  for(let j = 0; j < 3; j++) {
    for(let item of initList[i][j]) {
      let index = Number(item);

      if(output[i][j] === 0) {
        maLine[index].zeroCount += 1;
      }

      maLine[index].sum += output[i][j];
    }
  }
}

for(let i = 0; i < 8; i++) {
  if(maLine[i].zeroCount === 0) {
    sum = maLine[i].sum
  }
}

if(sum === 0) {
  let tmpSum = 0;
  let tmp = 0;
  
  // 대각선이 전부 0일 때 고려
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      tmp = 0;
      if(output[i][j] === 0) {
        for(let item of initList[i][j]) {
          let index = Number(item);
          
          if(maLine[index].zeroCount === 1) {
            tmp = maLine[index].sum
          }

        }
      }
      tmpSum += tmp
    }
  }

  sum = Math.round(tmpSum / 2)
}

for(let i = 0; i < 3; i++) {
  for(let j = 0; j < 3; j++) {
    if(output[i][j] === 0) {
      for(let item of initList[i][j]) {
        let index = Number(item);

        if(maLine[index].zeroCount === 1) {
          output[i][j] = sum - maLine[index].sum
        }

      }
    }
  }
}

for(let i = 0; i < 3; i++) {
  output[i] = output[i].join(' ')
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ