// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1254번
// 팰린드롬 만들기

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = 0;

const S = input[0];
const N = S.length;

let dp =  Array.from(Array(N), () => Array(N).fill(false));
let add = 0;

const isPalindrome = (start, end) => {
  if(start === end) {
    dp[start][end] = true;
    return;
  }

  if(start + 1 === end) {
    if(S[start] === S[end]) {
      dp[start][end] = true;
    }
    return;
  }

  isPalindrome(start + 1, end - 1);
  if(S[start] === S[end] && dp[start + 1][end - 1]) {
    dp[start][end] = true;
    return;
  }
}

for(let index in S) {
  isPalindrome(Number(index), N - 1);
  if(dp[Number(index)][N - 1]) {
    add = Number(index);
    break;
  }
}

output = N + add;
console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ