// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2539번
// 모자이크
//
// 사용되는 색종이는 모두 크기가 같고 정사각형 모양이다.
// 색종이 크기는 한 변의 길이로 나타내며, 원하는 크기의 색종이는 모두 구할 수 있다.
// 모든 색종이는 반드시 도화지의 밑변에 맞추어 붙인다. 이때 색종이를 겹쳐서 붙일 수 있다.

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = 1000001;

const firstInput = input[0].split(' ').map(value => Number(value));
const row = firstInput[0];
const col = firstInput[1];

const paperCount = Number(input[1]);
let wrongRow = [];
let wrongCol = [];

const isCover = (size) => {
  let judgeCount = 1;
  let judge = wrongCol[0];

  for(let index in wrongCol) {
    const isRange = (wrongCol[index] - judge) < size;
    if(!isRange) {
      judgeCount++;
      judge = wrongCol[index];
    }
  }

  return judgeCount <= paperCount;
}

const findOutput = () => {
  let left = wrongRow[wrongRow.length - 1];
  let right = Math.max(row, col);

  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    if(isCover(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

for(let i = 3; i < input.length; i++) {
  const wrongInput = input[i].split(' ').map(value => Number(value));
  wrongRow.push(wrongInput[0]);
  wrongCol.push(wrongInput[1]);
}

wrongRow = wrongRow.sort((a, b) => {return a - b});
wrongCol = wrongCol.sort((a, b) => {return a - b});
output = findOutput();

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ