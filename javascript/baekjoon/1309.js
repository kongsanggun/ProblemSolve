//  백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1309번
// 경우의 수의 9901로 나눈 나머지 출력
// DP

let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
let n = Number(input[0]);
let output = 3;

let dp = [];

dp[0] = [0, 0, 0];
dp[1] = [1, 1, 1];

for (let i = 2; i <= n; i++) {
    output = (dp[i - 1][0] * 2 + dp[i - 1][1] * 2 + dp[i - 1][2] * 3) % 9901;
    
    const tmp1 = (dp[i - 1][0] + dp[i - 1][2]) % 9901;
    const tmp2 = (dp[i - 1][1] + dp[i - 1][2]) % 9901;
    const tmp3 = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % 9901;

    dp[i] = [tmp1, tmp2, tmp3];
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ