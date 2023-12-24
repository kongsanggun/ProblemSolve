// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1904번
// 타일 1, 00 으로 길이가 N인 타일의 종류 갯수의 15746으로 나눈 나머지 구하기
// DP

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트

let n = Number(input[0]);
let dp = [];
// let output = 0;

// 초기 값 설정
dp[0] = 0;
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
}

console.log(dp[n]); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ