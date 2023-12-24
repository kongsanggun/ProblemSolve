// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 17404 : RGB거리 2
// DP
// 조건 : 1번 집의 색은 2번, N번 집의 색과 같지 않아야 한다.
//       N번 집의 색은 N-1번, 1번 집의 색과 같지 않아야 한다.
//       i(2 ≤ i ≤ N-1)번 집의 색은 i-1, i+1번 집의 색과 같지 않아야 한다.

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
let output = Infinity;

let n = Number(input[0]);
let cost = [];
let dp = [];

// 1. 비용을 계산한다.
for (let i = 0; i < n; i++) {
    const inputLine = input[i + 1].split(' ').map((value) => {return Number(value);});
    cost.push(inputLine);
}

// 2-1. 1번 집 세팅 
let initDp = [];

initDp[0] = [cost[0][0] , 0];
initDp[1] = [cost[0][1] , 1];
initDp[2] = [cost[0][2] , 2];

dp.push(initDp);

// 2-2. 2 ~ N-1번 집 세팅
for (let i = 1; i < n; i++) {
    let dpInput = [];

    if (dp[i - 1][1][0] > dp[i - 1][2][0] && (dp[i - 1][2][1] !== 0)) {
        dpInput[0] = [dp[i - 1][2][0] + cost[i][0], dp[i - 1][2][1]];
    }
    else {
        if (dp[i - 1][1][1] !== 0) {
            dpInput[0] = [dp[i - 1][1][0] + cost[i][0], dp[i - 1][1][1]];
        }
        else {
            dpInput[0] = [n * 1000 + 1, null];
        }
    }

    if (dp[i - 1][0][0] > dp[i - 1][2][0] && (dp[i - 1][2][1] !== 1) ) {
        dpInput[1] = [dp[i - 1][2][0] + cost[i][1], dp[i - 1][2][1]];
    }
    else {
        if (dp[i - 1][0][1] !== 1) {
            dpInput[1] = [dp[i - 1][0][0] + cost[i][1], dp[i - 1][0][1]];
        }
        else {
            dpInput[1] = [n * 1000 + 1, null];
        }
    }

    if (dp[i - 1][0][0] > dp[i - 1][1][0] && (dp[i - 1][1][1] !== 2)) {
        dpInput[2] = [dp[i - 1][1][0] + cost[i][2], dp[i - 1][1][1]];
    }
    else {
        if (dp[i - 1][0][1] !== 2) {
            dpInput[2] = [dp[i - 1][0][0] + cost[i][2], dp[i - 1][0][1]];
        }
        else {
            dpInput[2] = [n * 1000 + 1, null];
        }
    }

    dp.push(dpInput);
}

console.log(dp);

// 3. 최솟값 구하기
const compare = dp.pop();
for (let item of compare) {
    output = Math.min(output, item[0]);
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ