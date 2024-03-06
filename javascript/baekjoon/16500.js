// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 16500번
// 문자열 판별

let input = require('fs').readFileSync('input.txt').toString().split('\n');

const S = input[0];
const A = input.slice(2);
let dp = Array(S.length).fill(false); // i번째 부터 끝까지 있는 단어가 존재하는지 여부

// 단어가 맞는지 확인한다
const compareWord = (compareString) => {
  for(let word of A) {
    const wordLength = word.length;
    const compareLength = compareString.length;
    const compare = compareString.slice(compareLength - wordLength);

    if(compareLength >= wordLength && compare === word) {
      dp[compareLength - wordLength] = true;
    }
  }
}

// dp 진행 상황을 보면서 맞는지 확인한다.
compareWord(S);

for(let index = S.length - 2; index >= 0; index--) {
  if(dp[index + 1]) {
    const compareString = S.slice(0, index + 1);
    compareWord(compareString);
  }
}

console.log(dp[0] ? 1 : 0); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ